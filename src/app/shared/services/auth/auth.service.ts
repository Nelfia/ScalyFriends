import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../constants/constants";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, shareReplay, take, tap} from "rxjs";
import {UserInterface} from "../../interfaces/user.interface";
import {CommandsService} from "../commands/commands.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service d'Authetification d'un utilisateur
 */
export class AuthService implements OnInit{
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  public isLogged$ = new BehaviorSubject<boolean>(this.isLoggedIn());

  private isAdminSubject$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ : Observable<boolean> = this.isAdminSubject$.asObservable();
  private role!: string;

  private loggedUser! : UserInterface | null ;
  constructor(private http: HttpClient, private router: Router, private commandeService: CommandsService) { }

  ngOnInit() {
    this.isAdmin$.subscribe(isAdmin => this.role = isAdmin ? "ROLE_ADMIN" : "ROLE_USER")
  }

  /**
   * Tente de loguer le user.
   * Si OK: retourne son token + sa date d'expiration (timestamp).
   * Si NOK: erreur.
   * @param username du user à loguer
   * @param pwd haché du user à loguer
   * @return Observable<string>
   */
  login(username:string, pwd: string) : Observable<string> {
    if (this.isLoggedIn()) this.logout();
    // TODO : ajouter l'option withCredentials et gérer côté back !
    return this.http.post<any>(API_BASE_URL + 'api/users/login', {username, pwd}, {headers: this.headers})
      .pipe(
        tap((res) => {
          this.setSession(res);
        }),
        take(1),
        shareReplay(1)
      );
  }

  /**
   * Enregistre le user logué dans le local Storage.
   * @param res réponse de la requête "login"
   * @private
   */
  private setSession(res: any) : void {
    localStorage.setItem('id_token', JSON.parse(res.idToken));
    localStorage.setItem('expires_at', res.expires);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('id_cart', JSON.stringify(res.idCart));
    this.isLogged$.next(true);
    this.role = JSON.parse(res.role)[0];
    console.log(this.role)
    if((JSON.parse(res.role)[0]) === "ROLE_ADMIN")
      this.isAdminSubject$.next(true);
    this.getLoggedUser();
  }

  /**
   * Récupère le token enregistré dans le localStorage.
   * @return le token de l'utilisateur logué.
   */
  getToken() : string | null {
    return localStorage.getItem('id_token');
  }

  /**
   * Délogue un utilisateur:
   *   - supprime toutes les données de l'utilisateur du LS
   *   - le délogue en back
   */
  logout() {
    this.http.delete(API_BASE_URL + "users/logout", {headers: this.headers});
    this.loggedUser = null;
    this.commandeService.idCart = null;
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    localStorage.removeItem("id_cart");
    this.isAdminSubject$.next(false);
    this.isLogged$.next(false);
  }

  /**
   * Vérifie si user logué et si son token est expiré.
   * @return TRUE si valide, FALSE si expiré.
   */
  isLoggedIn() : boolean {
    let expiresAt = Number(this.getExpiration());
    return (Date.now()/1000) < expiresAt;
  }

  /**
   * Vérifie si un utilisateur est admin.
   * @return TRUE si admin, sinon FALSE.
   */
  isAdmin() : boolean {
    return this.role === "ROLE_ADMIN";
  }

  /**
   * Récupère la date d'expiration dans le LS.
   */
  getExpiration() {
    return localStorage.getItem("expires_at");
  }

  /**
   * Enregistre un nouvel utilisateur en BDD.
   * Par défaut, sera un simple utilisateur.
   *
   * @param username
   * @param pwd
   */
  signin(username: string, pwd: string): Observable<string> {
    if (this.isLoggedIn()) this.logout();
    // TODO : ajouter l'option withCredentials et gérer côté back !
    return this.http.post<any>(API_BASE_URL + 'api/users', {username, pwd}, {headers: this.headers})
      .pipe(
        tap((res) => {
          console.log('Logged in')
          this.setSession(res);
        }),
        take(1),
        shareReplay(1)
      );
  }

  /**
   * Retourne l'instance de l'utilisateur logué.
   */
  getLoggedUser() : UserInterface | null {
    if (this.isLoggedIn()) {
      console.log('logged in')
      if (!this.loggedUser){
        let userLS = JSON.parse(localStorage.getItem('user') ?? '');
        if (userLS && userLS !== '')
          this.loggedUser = userLS ?? null;
      }
    } else
      console.log('logged out')

    return this.loggedUser;
  }
}

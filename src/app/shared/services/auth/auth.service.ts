import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../constants/constants";
import {Router} from "@angular/router";
import {Observable, shareReplay, tap} from "rxjs";
import {UserInterface} from "../../interfaces/user.interface";


@Injectable({
  providedIn: 'root'
})
/**
 * Classe d'Authetification d'un utilisateur
 */
export class AuthService {
  /**
   * Headers HTTP envoyés avec la requête.
   */
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private static loggedUser : UserInterface;
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Tente de loguer le user.
   * Si OK: retourne son token + sa date d'expiration (timestamp).
   * Si NOK: erreur.
   * @param username du user à loguer
   * @param pwd haché du user à loguer
   * @return Observable<string>
   */
  login(username:string, pwd: string) : Observable<string> {
    return this.http.post<any>(API_BASE_URL + 'api/users/login', {username, pwd}, {headers: this.headers})
      .pipe(
        tap((res) => {
          this.setSession(res);
        }),
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
    localStorage.setItem('id_cart', res.user.idCart);
  }

  /**
   * Récupère le token enregistré dans le localStorage.
   * @return le token de l'utilisateur logué.
   */
  getToken() : string | null {
    return localStorage.getItem('id_token');
  }

  /**
   * Supprime toutes les données de l'utilisateur du LS.
   */
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('user');
    localStorage.removeItem('id_cart');
  }

  /**
   * Vérifie si user logué et si son token est expiré.
   * @return TRUE si valide, FALSE si expiré.
   */
  isLoggedIn() : boolean {
    let expiresAt = Number(this.getExpiration());
    console.log((Date.now()/1000) < expiresAt)
    return (Date.now()/1000) < expiresAt;
  }

  /**
   * Récupère la date d'expiration dans le LS.
   */
  getExpiration() {
    return localStorage.getItem("expires_at");
  }

  getLoggedUser() : UserInterface {
    if (!AuthService.loggedUser){
      AuthService.loggedUser = JSON.parse(localStorage.getItem('user') ?? '');
    }
    return AuthService.loggedUser;
  }
}

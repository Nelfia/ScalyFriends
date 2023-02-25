import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {CommandInterface} from "../../interfaces/command.interface";
import {API_BASE_URL} from "../../constants/constants";
import {LineInterface} from "../../interfaces/Line.interface";
import {UserInterface} from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  public idCart: number | null;
  public cart$: BehaviorSubject<CommandInterface | null>;
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private cart!: CommandInterface;

  constructor(private http: HttpClient) {
    this.cart$ = new BehaviorSubject<CommandInterface | null>(this.getLsCart());
    this.idCart = Number(localStorage.getItem('id_cart')) ?? null;
  }

  /**
   * Ajouter une nouvelle line dans le panier.
   * Si user logué -> envoi en DB.
   * Sinon -> enregistré ds LS
   * @param line
   * @param loggedUser
   */
  addLine(line: LineInterface, loggedUser: UserInterface | null): Observable<CommandInterface | null> {
    console.log("dans addLine")
    // Si un utilisateur est logué, ajouter ligne en BD.
    if (loggedUser) {
      if(!this.idCart)
        return this.http.get<CommandInterface>(API_BASE_URL + "api/orders/" + loggedUser.idUser).pipe(
          tap(cart => {
            this.idCart = cart?.idCommand;
            this.cart$.next(cart);
            this.http.post<CommandInterface>(API_BASE_URL + "api/orders/" + (cart?.idCommand ?? this.idCart) + "/lines", line, {headers: this.headers}).pipe(
              tap(cart => this.cart$.next(cart))
            )
          }));
      return this.http.post<CommandInterface>(API_BASE_URL + "api/orders/" + (loggedUser.idCart ?? this.idCart) + "/lines", line, {headers: this.headers}).pipe(
        tap(cart => this.cart$.next(cart))
      );
    }
    // Si aucun utilisateur logué, récupérer/créer cart ds LS
    let cartLS = this.getLsCart() ?? this.newCartInterface();
    let cartLines: LineInterface[] = [];
    if (cartLS.lines)
      cartLines = this.addLsCartLine(cartLS.lines, line);
    else cartLines.push(line);
    cartLS.lines = cartLines;

    localStorage.setItem('cart', JSON.stringify(cartLS));
    this.cart$.next(cartLS);
    return this.cart$.asObservable();
  }

  private addLsCartLine(lines: LineInterface[], newLine: LineInterface): LineInterface[] {
    // Si aucune ligne dans tableau de lignes, créer tableau vide + insérer nouvelle ligne
    if (lines === null) {
      lines = [];
      lines.push(newLine);
    } else { // Si lignes dans tableau de lignes, vérifier si une ligne contient déjà le produit à ajouter.
      let isLineWithProduct: boolean = false;
      lines.forEach(line => {
        if (line.idProduct === newLine.idProduct && !isLineWithProduct) {
          isLineWithProduct = true;
          line.quantity += newLine.quantity;
          line.quantity = (line.quantity <= newLine.product.stock) ? line.quantity : newLine.product.stock;
        }
      })
      // Si le produit n'exite pas déjà dans les lignes du LS, l'ajouter
      if (!isLineWithProduct)
        lines.push(newLine);
    }
    return lines;
  }

  updateLine(line : LineInterface): Observable<CommandInterface | null> {
    if(line.idLine){
      // TODO: gérer le clic multiple pour prise en compte de la dernière quantité
      return this.http.put<CommandInterface>(API_BASE_URL + "api/orders/" + (line.idCommand ?? this.idCart) + "/lines", line, {headers: this.headers}).pipe(
        tap(cart => this.cart$.next(cart))
      );
    } else {
      console.log("pas d'idLine")
      let cartLs = this.getLsCart();
      cartLs.lines.forEach(lsLine => {
        if(line.idProduct === lsLine.idProduct)
          lsLine.quantity = line.quantity
      })
      localStorage.setItem('cart', JSON.stringify(cartLs));
      this.cart$.next(cartLs);
      return this.cart$.asObservable();
    }
  }

  /**
   * Supprime une ligne du panier.
   * @param idLine
   * @param idProduct
   */
  removeLine(idLine: Number, idProduct: number): Observable<CommandInterface | null> {
    // Si logué, supprimer ligne en db.
    if (this.idCart) {
      console.log(this.idCart)
      return this.http.delete<CommandInterface>(API_BASE_URL + "api/orders/" + this.idCart + "/lines/" + idLine, {headers: this.headers}).pipe(
        take(1),
        tap(cart => {
          this.cart = cart;
          this.cart$.next(this.cart)
        })
      );
    }
    // Si non logué, supprimer ligne ds ls cart.
    let cartLS : CommandInterface = this.getLsCart();
    // update ls cart
    cartLS.lines.forEach((line, index) => {
      if(line.idProduct === idProduct)
        cartLS?.lines.splice(index, 1);
    })
    // enregitrer ds ls
    localStorage.setItem('cart', JSON.stringify(cartLS));
    console.log(cartLS)
    this.cart$.next(cartLS);
    return this.cart$?.asObservable() ?? null;
  }

  /**
   * Récupère le panier enregistré dans le LS.
   * Si inexistant, le construire, l'insérer ds LS et le retourner.
   * @return CommandInterface
   */
  getLsCart(): CommandInterface {
    const lsCart = localStorage.getItem('cart');
    return lsCart ? JSON.parse(lsCart) : null;
  }

  /**
   * Créé une nouvelle CommandInterface 'vierge'.
   * @private
   */
  private newCartInterface(): CommandInterface {
    return {
      lastChange: "",
      lines: [],
      orderDate: "",
      ref: "",
      status: "",
      idCommand: 0,
      idAgent: 0,
      idCustomer: 0
    };
  }

  /**
   * Fusionne les 2 paniers pour n'en retourner qu'un.
   * @param cart
   * @param user
   * @return CommandInterface
   */
  agregateCarts(cart: CommandInterface, user: UserInterface): void {
    let cartLS = this.getLsCart();
    // agreger les deux carts
    if(cartLS) {
      console.log(cartLS.lines)
      cartLS.lines.forEach(line => {
        this.http.post<CommandInterface>(API_BASE_URL + "api/orders/" + (this.idCart ?? user.idCart) + "/lines", line, {headers: this.headers}).pipe(
          tap(cart => this.cart$.next(cart)),
          take(1)
        ).subscribe();
      })
    }
    else {
      this.cart$.next(cart);
    }
    localStorage.removeItem('cart');
  }
}

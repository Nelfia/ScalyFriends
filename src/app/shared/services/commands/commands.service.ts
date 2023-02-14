import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, take, tap} from "rxjs";
import {CommandInterface} from "../../interfaces/command.interface";
import {API_BASE_URL} from "../../constants/constants";
import {LineInterface} from "../../interfaces/Line.interface";
import {UserInterface} from "../../interfaces/user.interface";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  public idCart: number;
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

  // createCart(): Observable<any>{
  //   return this.http.post(API_BASE_URL + "api/orders/" ,{headers: this.headers});
  // }

  /**
   * Ajouter une nouvelle line dans le panier.
   * Si user logué -> envoi en DB. Sinon -> enregistré ds LS
   * @param line
   * @param loggdUser
   */
  addLine(line: LineInterface, loggdUser: UserInterface | null): Observable<CommandInterface | null> {
    console.log("dans addLine")
    // Si un utilisateur est logué, ajouter ligne en BD.
    if (loggdUser) {
      return this.http.post<CommandInterface>(API_BASE_URL + "api/orders/" + this.idCart + "/lines", line, {headers: this.headers}).pipe(
        tap(cart => this.cart$.next(cart))
      );
    }
    // Si pas d'utilisateur logué, check cart LS
    let cartLS = this.getLsCart();
    let cartLines: LineInterface[] = [];
    if (cartLS?.lines)
      cartLines = this.updateLine(cartLS.lines, line);
    let newCart: CommandInterface;
    newCart = {
      lastChange: Date(),
      lines: cartLines,
      orderDate: "",
      ref: "",
      status: "",
      idCommand: 0,
      idAgent: 0,
      idCustomer: 0
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.cart$.next(newCart);
    return this.cart$.asObservable();
  }

  private updateLine(lines: LineInterface[], newLine: LineInterface, idCart?: number): LineInterface[] {
    // Si l'idCommand du cart a été transmis
    if(idCart)
      newLine.idCommand = idCart
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
      if (!isLineWithProduct) {
        newLine.idCommand = idCart ?? 0;
        lines.push(newLine);
      }
    }
    return lines;
  }

  /**
   * Récupère le panier.
   * @return Observable<CommandInterface>
   */
  getCart(isLogged: boolean) {
    let cart: CommandInterface | null;
    // si loggué
    if (isLogged) {
      // recupérer le panier de user
      cart = this.cart$.getValue();
      // aggreger les 2 paniers en un (ls + db)
      if(cart)
        cart = this.agregateCarts(cart)
      // mettre a jour bdd
      this.http.put<CommandInterface>(API_BASE_URL + '/api/orders/' + cart?.idCommand , cart, {headers: this.headers}).pipe(
        tap(cart => {
          // emettre panier via behavior
          this.cart$.next(cart);
          console.log(cart);
        })
      )
    } else {  // si pas loggué
      let cartLS : CommandInterface | null;
      // si panier present ds ls, le récupérer
      cartLS = this.getLsCart();
      if(cartLS)
        // emettre panier via behavior
        this.cart$.next(cartLS);
    }
  }

  /**
   * Supprime une ligne du panier.
   * @param idLine
   * @param idProduct
   */
  removeLine(idLine: Number, idProduct: number): Observable<CommandInterface | null> {
    if (this.idCart) {
      return this.http.delete<CommandInterface>(API_BASE_URL + "api/orders/" + this.idCart + "/lines/" + idLine, {headers: this.headers}).pipe(
        take(1),
        tap(cart => {
          this.cart = cart;
          this.cart$.next(this.cart)
        })
      );
    }
    let cartLS : CommandInterface | null = this.getLsCart();
    // check ls cart
    if(cartLS) {
      // update cart
      cartLS.lines.forEach((line, index) => {
        if(line.idProduct === idProduct)
          cartLS?.lines.splice(index, 1);
      })
      // enregitrer ds ls
      localStorage.setItem('cart', JSON.stringify(cartLS));
    console.log(cartLS)
    this.cart$.next(cartLS);
    }
    return this.cart$?.asObservable() ?? null;
  }

  /**
   * Récupère le panier enregistré dans le LS.
   * @return CommandInterface
   */
  getLsCart(): CommandInterface | null {
    const lsCart = localStorage.getItem('cart');
    return lsCart ? JSON.parse(lsCart) : null;
  }

  /**
   * Fusionne les 2 paniers pour n'en retourner qu'un.
   * @param cart
   * @return CommandInterface
   */
  agregateCarts(cart: CommandInterface): CommandInterface {
    let cartLS = this.getLsCart();
    // agreger les deux carts
    let newCart: CommandInterface;
    let newLines: LineInterface[] = [];
    if(cartLS) {
      cartLS.lines.forEach(line => {
        newLines = this.updateLine(cart.lines, line, cart.idCommand);
      })
    }
    newCart = {
      idAgent: 0,
      idCustomer: cart.idCustomer,
      idCommand: cart.idCommand,
      lastChange: String(new Date()),
      lines: newLines,
      orderDate: "",
      ref: "",
      status: cart?.status ?? 'cart'
    }
    localStorage.removeItem('cart');
    return newCart;
  }
}

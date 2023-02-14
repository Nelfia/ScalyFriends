import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, map, Observable, take, tap} from "rxjs";
import {CommandInterface} from "../../interfaces/command.interface";
import {API_BASE_URL} from "../../constants/constants";
import {LineInterface} from "../../interfaces/Line.interface";
import {UserInterface} from "../../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  public idCart: number | null = null;
  public cart$: BehaviorSubject<CommandInterface | null>;
  /**
   * Headers HTTP envoyés avec la requête.
   */
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
    if (cartLS)
      cartLines = cartLS.lines;
    cartLines = this.updateLine(cartLines, line);
    let cart: CommandInterface;
    cart = {
      lastChange: "",
      lines: cartLines,
      orderDate: "",
      ref: "",
      status: "",
      idCommand: 0,
      idAgent: 0,
      idCustomer: 0
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
    return this.cart$.asObservable();
  }

  private updateLine(lines: LineInterface[], newLine: LineInterface): LineInterface[] {
    // Si aucune ligne dans LS, créer tableau vide + insérer nouvelle ligne
    if (lines === null) {
      lines = [];
      lines.push(newLine);
    } else { // Si lignes dans LS, vérifier si une ligne contient déjà le produit à ajouter.
      let isLineWithProduct: boolean = false;
      lines.forEach(line => {
        if (line.idProduct === newLine.idProduct && !isLineWithProduct) {
          isLineWithProduct = true;
          line.quantity += newLine.quantity;
          line.quantity = (line.quantity <= newLine.product.stock) ? line.quantity : newLine.product.stock;
        }
      })
      // Si le produit n'exite pas déjà dans les lignes du LS, l'ajouter
      if (!isLineWithProduct) lines.push(newLine);
    }
    return lines;
  }

  /**
   * Récupère le panier en lazy loading.
   * @return Observable<CommandInterface>
   */
  getCart(isLogged: boolean) {
    // if (this.cart)
    //   observable = of(this.cart);
    // else if (localStorage.getItem('cart'))
    //   observable = of(JSON.parse(localStorage.getItem('cart')??''));
    // else {
    //   observable = this.http.get<CommandInterface>(API_BASE_URL + "api/orders/cart").pipe(
    //     tap((res: CommandInterface) => {
    //       this.cart = res
    //       this.cart$.next(this.cart)
    //     }),
    //     share()
    //   )
    // }

    let cart: CommandInterface | null;
    // recupérer le panier ds le localstorage.
    let cartLS = localStorage.getItem('cart');

    // si loggué,
    if (isLogged) {
      // recupérer le panier de user
      cart = this.cart$.getValue() ?? null;
      // aggreger les paniers en un
      cart = this.agregateCarts(cart)
      // mettre a juor bdd
      this.http.put<CommandInterface>(API_BASE_URL + '/api/orders/' + this.idCart, cart, {headers: this.headers}).pipe(
        tap(cart => {
          this.cart$.next(cart);
          console.log(cart);
        })
      )

      // emettre panier via behavior
    }
    // si pas loggué
    // si panier present ds ls
    // recupérer le panier ds le localstorage

    // emettre panier via behavior
  }

  removeLine(id: Number): Observable<CommandInterface> {
    // if (loggdUser) {

    return this.http.delete<CommandInterface>(API_BASE_URL + "api/orders/" + this.idCart + "/lines/" + id, {headers: this.headers}).pipe(
      take(1),
      tap(cart => {
        this.cart = cart;
        this.cart$.next(this.cart)
      })
    );


    // check ls cart
    // update cart
    // enregitrer ds ls
    // this.cart$.next(newCart)
  }

  getLsCart(): CommandInterface | null {
    const lsCart = localStorage.getItem('cart');
    return lsCart ? JSON.parse(lsCart) : null;
  }

  agregateCarts(cart: CommandInterface | null): CommandInterface | null {
    const lsCart = this.getLsCart() ?? null;
    // agreger les deux carts
    let newCart: CommandInterface;
    let newLines: LineInterface[] = [];
    lsCart?.lines.forEach(line => {
      if (cart?.lines) {
        newLines = this.updateLine(cart.lines, line);
      }
    })
    newCart = {
      idAgent: 0,
      idCommand: 0,
      idCustomer: 0,
      lastChange: "",
      lines: newLines,
      orderDate: "",
      ref: "",
      status: ""
    }

    this.cart$.next(newCart);
    localStorage.removeItem('cart');
    return newCart;
  }
}

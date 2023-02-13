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
  addLine(line: LineInterface, loggdUser: UserInterface | null): Observable<CommandInterface> | null {
    console.log("dans addLine")
    if (loggdUser) {
      return this.http.post<CommandInterface>(API_BASE_URL + "api/orders/" + this.idCart + "/lines", line, {headers: this.headers}).pipe(
        tap(cart => {
          this.cart = cart;
          this.cart$.next(this.cart)
        })
      );
    }

    // check ls cart
    let cartLinesLS = localStorage.getItem('cartLines');
    let cartLines: LineInterface[] = cartLinesLS ? JSON.parse(cartLinesLS) : null;
    if (cartLinesLS === null) {
      cartLines = [];
      cartLines.push(line);
    } else {
      let isLineWithProduct: boolean = false;
      cartLines.forEach(lineLS => {
        if (lineLS.idProduct === line.idProduct && !isLineWithProduct) {
          isLineWithProduct = true;
          lineLS.quantity += line.quantity;
          lineLS.quantity = (lineLS.quantity <= line.product.stock) ? lineLS.quantity : line.product.stock;
        }
      })
      if (!isLineWithProduct)
        cartLines.push(line)
    }
    localStorage.setItem('cartLines', JSON.stringify(cartLines));
    // else {
    //
    // }
    // update cart
    // enregitrer ds ls
    // this.cart$.next(newCart)
    return null;

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


    // si loggué,
    if (isLogged) {
    }
    // recupérer le panier de user
    // si panier present ds ls
    // recupérer le panier ds le localstorage
    // aggreger les paniers en un
    // mettre a juor bdd
    // emettre panier via behavior

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

  agregateCarts(cart: CommandInterface) {
    const lsCart = this.getLsCart();
    // agreger les deux carts
    const newCart = null;
    localStorage.removeItem('cart');

    this.cart$.next(cart);

  }
}

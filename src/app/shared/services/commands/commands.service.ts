import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, tap, share, finalize} from "rxjs";
import {CommandInterface} from "../../interfaces/command.interface";
import {API_BASE_URL} from "../../constants/constants";
import {LineInterface} from "../../interfaces/Line.interface";

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  /**
   * Headers HTTP envoyés avec la requête.
   */
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private cart : CommandInterface | null = null;
  private cart$ : Observable<CommandInterface> | null = null;
  private idCart : number | null = null;
  constructor(private http: HttpClient) {
    this.idCart = Number(localStorage.getItem('id_cart')) ??  null;
  }

  createCart(): Observable<any>{
    return this.http.post(API_BASE_URL + "api/orders/" ,{headers: this.headers});
  }
  addLine(line: LineInterface | Partial<LineInterface>) : Observable<LineInterface> {
    console.log("dans addLine")
    return this.http.post<LineInterface>(API_BASE_URL + "api/orders/" + line.idCommand + "/lines", line ,{headers: this.headers});
  }

  /**
   * Récupère le panier en lazy loading.
   */
  getCart(): Observable<CommandInterface> {
    let observable: Observable<CommandInterface>;
    if (this.cart)
      observable = of(this.cart);
    else if (this.cart$)
      observable = this.cart$;
    else {
      this.cart$ = this.http.get<CommandInterface> (API_BASE_URL + "api/orders/cart")
        .pipe(
          tap( (res : CommandInterface) => this.cart = res),
          share(),
          finalize(() => this.cart$ = null)
        );
      observable = this.cart$;
    }
    return observable;
  }

  updateLine(line : LineInterface ) : LineInterface {
    console.log("Prêt à MAJ !");
    console.log(line);
    return line;
  }
  removeLine(id: Number) {
    return this.http.delete(API_BASE_URL + "api/orders/" + this.idCart + "/lines/" + id, { headers : this.headers }).subscribe(() => "Delete successful");
  }
}

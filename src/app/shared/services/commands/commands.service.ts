import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, share, tap} from "rxjs";
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
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private cart!: CommandInterface;
  private idCart!: number;
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
   * @return Observable<CommandInterface>
   */
  getCart(): Observable<CommandInterface> {
    let observable: Observable<CommandInterface>;
    if (this.cart)
      observable = of(this.cart);
    else {
      observable = this.http.get<CommandInterface>(API_BASE_URL + "api/orders/cart").pipe(
        tap((res: CommandInterface) => this.cart = res),
        share()
      )
    }
    return observable;
  }
  removeLine(id: Number) {
    return this.http.delete(API_BASE_URL + "api/orders/" + this.idCart + "/lines/" + id, { headers : this.headers }).subscribe(() => "Delete successful");
  }
}

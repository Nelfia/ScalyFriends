import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  idCart : number | null = null;
  constructor(private http: HttpClient) {
    this.idCart = Number(localStorage.getItem('id_cart')) ??  null;
    console.log(this.idCart)
  }
  getCart(): Observable<CommandInterface> {
    return this.http.get<CommandInterface> (API_BASE_URL + "api/orders/cart");
  }
  addLine(formData: LineInterface) : Observable<any> {
    return this.http.post(API_BASE_URL + "api/orders/" + this.idCart + "/lines", formData ,{headers: this.headers});
  }
}

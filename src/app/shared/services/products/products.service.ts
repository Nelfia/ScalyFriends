import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductInterface} from "../../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products')
  }
  public getAnimals(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/animal')
  }
  public getMaterials(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/material')
  }
  public getFeeding(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/feeding')
  }
  public getProductsById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>('http://api-scalyfriends/api/products/' + id)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';
import { ProductInterface } from "../../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private animals!: ProductInterface[];
  private materials!: ProductInterface[];
  private feeding!: ProductInterface[];

  constructor(private http: HttpClient) {}
  public getAnimals(): Observable<ProductInterface[]> {
    let observable: Observable<ProductInterface[]>;
    if(this.animals)
      observable = of(this.animals);
    else {
      observable = this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/animal').pipe(
        tap((res: ProductInterface[]) => this.animals = res ),
        share()
      )
    }
    return observable;
  }
  public getMaterials(): Observable<ProductInterface[]> {
    let observable: Observable<ProductInterface[]>;
    if(this.materials)
      observable = of(this.materials);
    else {
      observable = this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/material').pipe(
        tap((res: ProductInterface[]) => this.materials = res ),
        share()
      )
    }
    return observable;
  }
  public getFeeding(): Observable<ProductInterface[]> {
    let observable: Observable<ProductInterface[]>;
    if(this.feeding)
      observable = of(this.feeding);
    else {
      observable = this.http.get<ProductInterface[]>('http://api-scalyfriends/api/products/feeding').pipe(
        tap((res: ProductInterface[]) => this.feeding = res ),
        share()
      )
    }
    return observable;
  }
  public getProductById(id: number, category?: string): Observable<ProductInterface | undefined> {
    let product: ProductInterface | undefined;

    if (category) {
      let productsArray: ProductInterface[] | undefined;
      switch (category) {
        case 'animals':
          productsArray = this.animals;
          break;
        case 'materials':
          productsArray = this.materials;
          break;
        case 'feeding':
          productsArray = this.feeding;
          break;
        default:
          productsArray = undefined;
          break;
      }
      return productsArray ? of(productsArray.find(product => product.idProduct === +id)) : this.http.get<ProductInterface>('http://api-scalyfriends/api/products/' + id)
    }

    return this.http.get<ProductInterface>('http://api-scalyfriends/api/products/' + id)

  }
}

import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductsService} from "../services/products/products.service";
import {ProductInterface} from "../interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class AnimalsResolver implements Resolve<ProductInterface[]> {
  constructor(private productsService: ProductsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductInterface[]> {
    return this.productsService.getAnimals();
  }
}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductInterface} from "../interfaces/product.interface";
import {ProductsService} from "../services/products/products.service";

@Injectable({
  providedIn: 'root'
})
export class FeedingResolver implements Resolve<ProductInterface[]> {
  constructor(private productsService: ProductsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductInterface[]> {
    return this.productsService.getFeeding();
  }
}

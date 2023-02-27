import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
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

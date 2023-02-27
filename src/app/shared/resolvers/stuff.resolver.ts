import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductInterface} from "../interfaces/product.interface";
import {ProductsService} from "../services/products/products.service";

@Injectable({
  providedIn: 'root'
})
export class StuffResolver implements Resolve<ProductInterface[]> {
  constructor(private productsService: ProductsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductInterface[]> {
    return this.productsService.getMaterials();
  }
}

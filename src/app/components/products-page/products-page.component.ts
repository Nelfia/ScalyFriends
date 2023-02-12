import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit{

  apiBaseUrl! : string;
  product$!: Observable<ProductInterface>;
  quantity: number = 1;
  idProduct!: number;
  constructor(private productsService: ProductsService, private router: Router ) {}
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
    this.idProduct = Number(this.router.url ? this.router.url.split("").pop() : 0);
    this.product$ = this.productsService.getProductById(this.idProduct);
  }

  onSubmitForm(): void {
    console.log(this.quantity);
  }
}



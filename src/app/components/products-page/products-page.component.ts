import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../shared/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  public product : ProductInterface|null = null;
  public activeRoute: string = '';
  public apiBaseUrl = API_BASE_URL;
  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const idProduct = params['id'];
      this.product = await this.productsService.getProductsById(idProduct).toPromise() ?? null;
      this.product?.img ? this.product.img = `${this.apiBaseUrl}${this.product?.img}` : null;
      this.activeRoute = this.router.url;
    })
  }
}

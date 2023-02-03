import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../shared/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {ActivatedRoute, Router} from '@angular/router';
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: ProductInterface[] = [];
  public apiBaseUrl = API_BASE_URL;
  public activeRoute: string = '';

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.route.data.subscribe(( { products } ) => {
      this.products = products.map((product: any) => {
        product.img = `${this.apiBaseUrl}${product.img}`;
        return product;
      });
    });
    this.activeRoute = this.router.url;
  }

}

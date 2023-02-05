import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {API_BASE_URL} from "../../shared/constants/constants";
import {AuthService} from "../../shared/services/auth/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  form: FormGroup;
  public product : ProductInterface|null = null;
  public activeRoute: string = '';
  public apiBaseUrl = API_BASE_URL;
  constructor(private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private productsService: ProductsService) {
    this.form = this.fb.group({
      quantity: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const idProduct = params['id'];
      this.product = await this.productsService.getProductsById(idProduct).toPromise() ?? null;
      this.product?.img ? this.product.img = `${this.apiBaseUrl}${this.product?.img}` : null;
      this.activeRoute = this.router.url;
    })
  }

  addLine() {
    // Vérification qu'il y a un idCart dans le Local Storage + récupération cart
    let idCart = Number(localStorage.getItem('id_cart') ?? null);
    if(!idCart) {

    }
  }
}

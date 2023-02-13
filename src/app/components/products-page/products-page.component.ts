import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable, take, tap} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {CommandInterface} from "../../shared/interfaces/command.interface";

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
  idCart!: number;
  constructor(private productsService: ProductsService, private router: Router, private authService : AuthService, private commandsService: CommandsService) {}
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
    this.idProduct = Number(this.router.url ? this.router.url.split("").pop() : 0);
    this.product$ = this.productsService.getProductById(this.idProduct);
    this.idCart = Number(localStorage.getItem('id_cart'));
  }

  onSubmitForm(product: ProductInterface): void {
    let newLine = this.createLine(product);
    let loggedUser = this.authService.getLoggedUser();
    console.log(loggedUser)
    this.commandsService.addLine(newLine, loggedUser).pipe(
      take(1),
      tap(cart => {
        console.log(cart)
      })
    ).subscribe();
  }

  private createLine(product : ProductInterface): LineInterface {
    return {
      idCommand: (this.idCart && this.idCart !== 0) ?this.idCart : 0,
      idLine: 0,
      idProduct: product.idProduct,
      price: product.price,
      quantity: this.quantity,
      product: product
    }
  }
}



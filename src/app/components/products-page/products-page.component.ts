import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable, Subject, take, takeUntil} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit, OnDestroy{

  apiBaseUrl! : string;
  product$!: Observable<ProductInterface | undefined>;
  quantity: number = 1;
  idProduct!: number;
  idCart!: number;
  destroy$ : Subject<boolean> = new Subject<boolean>()
  category!: string;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
    private commandsService: CommandsService
  ) {}
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
    this.idProduct = this.route.snapshot.params?.['id'];
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.category = data?.['category'];
    })

    this.product$ = this.productsService.getProductById(this.idProduct, this.category);
    this.idCart = Number(localStorage.getItem('id_cart'));
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }

  onSubmitForm(product: ProductInterface): void {
    let newLine = this.createLine(product);
    let loggedUser = this.authService.getLoggedUser();
    console.log(loggedUser)
    this.commandsService.addLine(newLine, loggedUser)?.pipe(
      take(1)
    ).subscribe();
  }

  private createLine(product : ProductInterface): LineInterface {
    return {
      idCommand: (this.idCart && this.idCart !== 0) ? this.idCart : 0,
      idLine: 0,
      idProduct: product.idProduct,
      price: product.price,
      quantity: this.quantity,
      product: product
    }
  }
}



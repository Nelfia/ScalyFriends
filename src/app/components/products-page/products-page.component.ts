import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {API_BASE_URL} from "../../shared/constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Observable} from "rxjs";
import {CommandInterface} from "../../shared/interfaces/command.interface";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  form: FormGroup;
  cart : CommandInterface | null = null;
  public product : ProductInterface | null = null;
  public activeRoute: string = '';

  constructor(private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private productsService: ProductsService, private authService: AuthService, private commandsService : CommandsService) {
    this.form = this.fb.group({
      quantity: [1, Validators.min(1)],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const idProduct = params['id'];
      this.product = await this.productsService.getProductsById(idProduct).toPromise() ?? null;
      this.product?.img ? this.product.img = `${API_BASE_URL}${this.product?.img}` : null;
      this.activeRoute = this.router.url;
    })
  }

  addLine(form: FormGroup) {
    const val = form.value;
    // Récupérer l'idCart du LS.
    let idCart = Number(localStorage.getItem('id_cart')) ?? null;
    // Si l'utilisateur est logué.
    let user = this.authService.getLoggedUser();
    if (user){
      if (!idCart || idCart === 0)
      {
        console.log(user.idUser)
        let newCart = this.commandsService.createCart().toPromise();
        console.log(newCart)
      }
    }
    console.log("idCart :" + idCart);
    console.log("quantité :" + val.quantity)
  }
}

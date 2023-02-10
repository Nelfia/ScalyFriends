import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../shared/services/products/products.service";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {API_BASE_URL} from "../../shared/constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Observable, tap} from "rxjs";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {LinesService} from "../../shared/services/lines/lines.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  form: FormGroup;
  product : ProductInterface | null = null;
  cart : CommandInterface | null = null;
  line: LineInterface | null = null;
  public activeRoute: string = '';

  constructor(private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private productsService: ProductsService, private authService: AuthService, private commandsService : CommandsService, ) {
    this.form = this.fb.group({
      quantity: [1, Validators.min(1)],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const idProduct = params['id'];
      let receivedProduct = await this.productsService.getProductsById(idProduct).toPromise();
      if (receivedProduct) this.product = receivedProduct;
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
      if (!idCart || idCart == 0) // Et qu'il n'a pas de panier
      { // Créer le panier & le récupérer.
        this.commandsService.createCart().subscribe(cart => {
          this.cart = cart;
          localStorage.setItem('id_cart', JSON.stringify(cart.idCommand));
          localStorage.setItem('cart', JSON.stringify(cart));
          let newLine = this.constructLineToSend(cart.idCommand, val.quantity);

          console.log("idCart :" + this.cart?.idCommand);
          console.log(this.cart);
          console.log(this.cart);
        })

        //     // console.log(this.cart);
        //     // console.log(this.cart?.idCommand);
        //   })
        // );
        // console.log(JSON.parse(JSON.stringify(newCart)))
        // idCart = JSON.parse(JSON.stringify(newCart)).idCommand;
      }
    }
    // // Construire la nouvelle ligne à insérer.
    // let cartLines;
    // if(user) {
    //   cartLines = JSON.parse(localStorage.getItem("cart")?? "").lines ?? [];
    // } else {
    //   cartLines = JSON.parse(localStorage.getItem("temp_lines")?? "")?? [];
    // }

    // console.log(newLine);


    console.log("quantité :" + val.quantity)
  }

  /**
   * Construire la ligne à enregistrer dans le panier.
   * @param idCart id de la commande status 'cart'
   * @param quantity Quantité sélectionnée pour le produit
   * @private
   * @return Partial<LineInterface>
   */
  private constructLineToSend(idCart: number, quantity: number) : Partial<LineInterface> {
    return {
      idCommand: idCart,
      price: this.product?.price,
      idProduct: this.product?.idProduct,
      quantity,
      product: this.product?? undefined
    };
  }

  private constructReceivedCart(idUser : number) : Partial<CommandInterface> {
    return {
      idCommand: this.cart?.idCommand,
      idCustomer: idUser,
      lines: undefined
    };
  }
}



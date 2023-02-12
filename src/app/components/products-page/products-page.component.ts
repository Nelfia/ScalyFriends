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
import {LineInterface} from "../../shared/interfaces/Line.interface";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit{
  form: FormGroup;
  product$: Observable<ProductInterface> | null = null;
  cart : CommandInterface | null = null;
  cart$: Observable<CommandInterface> | null = null;
  line: LineInterface | null = null;
  line$: Observable<LineInterface> | null = null;
  public activeRoute: string = '';

  constructor(private fb:FormBuilder, private router: Router, private route: ActivatedRoute, private productsService: ProductsService, private authService: AuthService, private commandsService : CommandsService, ) {
    this.cart$ = this.getCart();
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
  addProduct(form: FormGroup) {
    let idCart : number;
    let lines : LineInterface[];
    let line : LineInterface | Partial<LineInterface>;
    // Récupérer les valeurs du formulaire
    const val = form.value;
    let user = this.authService.getLoggedUser() ?? null;
    console.log("user :")
    console.log(user);
    // Si utilisateur logué
    if (user) {
      // Si idPanier ds LS: récupérer panier existant.
      idCart = Number(JSON.parse(localStorage.getItem('id_cart')?? '0')) ?? null;
      console.log(idCart);
      if (idCart && idCart > 0) this.getCart();
      // Sinon, créer panier en DB.
      else this.cart = this.createCart()
      console.log(this.cart);
      // Si panier, récupérer les lignes du panier
      if(this.cart){
        let cart : CommandInterface = this.cart;
        lines = cart.lines ?? [];
        console.log(lines)
        // Si lignes[] ds panier: vérifier si une ligne contient l'id du produit à ajouter
        if (lines && lines.length > 0) {
          lines.forEach(lineInCart => {
            // Si oui, ajouter nouvelle quantité à quantité existante et vérifier stock produit
            if (lineInCart.idProduct === this.product?.idProduct) {
              let totalQuantity = lineInCart.quantity + val.quantity;
              // Vérifier quantité de produits ajoutés par rapport à stock produit.
              if (totalQuantity > this.product.stock) {
                lineInCart.quantity = this.product.stock;
                console.log("Pas suffisament de produit en stock. Stock max inséré: " + this.product.stock);
              } else
                lineInCart.quantity = totalQuantity;
              console.log("this.commandsService.addLine(lineInCart)");
            }
          });
        }
        console.log("Aucune ligne dans le panier ou aucun produit correspondant")

        // Si pas de ligne dans panier ou pas de ligne correspondant à produit, la créer.
        line = this.constructLine(this.cart.idCommand, val.quantity);
        console.log(line);
          // Ajouter nouvelle ligne au panier
        this.addLine(line);
        console.log(cart);
        // Mettre à jour panier en BD et ds LS

      }
    } else {
      console.log("Aucun utilisateur logué")
    // Si utilisateur non logué
      // Si 'temp_cart' ds LS, le récupérer
        // Récupérer les lignes du panier en LS
        // Si lignes[] ds panier: vérifier si une ligne contient l'id du produit à ajouter
          // Si oui, ajouter nouvelle quantité à quantité existante et vérifier stock produit
      // Si pas de 'temp_cart' ds LS, le créer.
      // Si pas de ligne dans 'temp_cart' ou pas de ligne correspondant à produit
        // Créer nouvelle ligne
        // Ajouter nouvelle ligne au panier
      // Mettre à jour le 'temp_cart' ds LS

    }

    console.log("Utilisateur logué ou non - fin addLine")



    // let newLine = this.constructLineToSend(this.cart?.idCommand, val.quantity);


  }


  /**
   * Créer un nouveau panier en DB pour l'utilisateur logué.
   * @private
   */
  private createCart(): CommandInterface | null {
    this.commandsService.createCart().subscribe(cart => {
      localStorage.setItem('id_cart', JSON.stringify(cart.idCommand));
      return cart;
    })
    return null;
  }
  private getCart(): any {
    return this.commandsService.getCart().subscribe(cart => {
        this.cart = cart;
        localStorage.setItem('id_cart', JSON.stringify(cart.idCommand));
        this.cart = cart;
        return cart;
      })
  }

  /**
   * Construire la ligne à enregistrer dans le panier.
   * @param idCart id de la commande status 'cart'
   * @param quantity Quantité sélectionnée pour le produit
   * @private
   * @return Partial<LineInterface>
   */
  private constructLine(idCart: number, quantity: number) : LineInterface | Partial<LineInterface> {
    return {
      idLine: this.line?.idLine,
      idCommand: idCart,
      price: this.product?.price,
      idProduct: this.product?.idProduct,
      quantity,
      product: this.product ?? undefined
    };
  }
  private addLine(line: LineInterface | Partial<LineInterface>) {
    this.commandsService.addLine(line).subscribe(line => {
      console.log(line)
      this.getCart();
      let linesCartLS = this.cart?.lines;
      console.log(this.cart?.lines)
      linesCartLS?.push(line);
      return line;
    });
    return null;
  }

}



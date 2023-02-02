import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";

@Component({
  selector: 'app-material-description',
  templateUrl: './material-description.component.html',
  styleUrls: ['./material-description.component.scss']
})
export class MaterialDescriptionComponent implements OnInit {
  public product: ProductInterface|null = null;
  public descriptionTab : string[]|undefined = [];
  constructor(private parent: ProductsPageComponent) {
    this.product = this.parent.product ?? null;
    this.descriptionTab = this.product?.description.split('\r\n\r\n');
  }

  ngOnInit(): void {

  }

}

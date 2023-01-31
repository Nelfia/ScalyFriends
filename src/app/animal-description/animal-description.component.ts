import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../shared/interfaces/product.interface";

@Component({
  selector: 'app-animal-description',
  templateUrl: './animal-description.component.html',
  styleUrls: ['./animal-description.component.scss']
})
export class AnimalDescriptionComponent implements OnInit {
  public product: ProductInterface|null = null;
  constructor(private parent: ProductsPageComponent) {
    this.product = this.parent.product ?? null;
  }

  ngOnInit(): void {
  }

}

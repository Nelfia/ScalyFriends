import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-animal-description',
  templateUrl: './animal-description.component.html',
  styleUrls: ['./animal-description.component.scss']
})
export class AnimalDescriptionComponent implements OnInit {
  product$!: Observable<ProductInterface | undefined>;
  constructor(private parent: ProductsPageComponent) {}
  ngOnInit(): void {
    this.product$ = this.parent.product$;
  }

}

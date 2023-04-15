import {Component, Input, OnInit} from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-animal-description',
  templateUrl: './animal-description.component.html',
  styleUrls: ['./animal-description.component.scss']
})
export class AnimalDescriptionComponent implements OnInit {
  @Input() product!: ProductInterface;
  constructor() { }
  ngOnInit(): void {}

}

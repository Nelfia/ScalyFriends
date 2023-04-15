import {Component, Input, OnInit} from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import { Observable, tap} from "rxjs";

@Component({
  selector: 'app-material-description',
  templateUrl: './material-description.component.html',
  styleUrls: ['./material-description.component.scss']
})
export class MaterialDescriptionComponent implements OnInit {
  @Input() product!: ProductInterface;

  public descriptionTab! : string[] | undefined;
  constructor() { }
  ngOnInit(): void {
    this.descriptionTab = this.product.description.split('\r\n\r\n')
  }

}

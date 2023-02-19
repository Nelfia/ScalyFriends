import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import { Observable, tap} from "rxjs";

@Component({
  selector: 'app-material-description',
  templateUrl: './material-description.component.html',
  styleUrls: ['./material-description.component.scss']
})
export class MaterialDescriptionComponent implements OnInit {
  product$!: Observable<ProductInterface | undefined>;
  public descriptionTab! : string[] | undefined;
  constructor(private parent: ProductsPageComponent) { }
  ngOnInit(): void {
    this.product$ = this.parent.product$.pipe(
      tap(product => {
        this.descriptionTab = product?.description.split('\r\n\r\n')
      })
    );
  }

}

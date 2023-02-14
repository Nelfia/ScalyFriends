import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-feeding-description',
  templateUrl: './feeding-description.component.html',
  styleUrls: ['./feeding-description.component.scss']
})
export class FeedingDescriptionComponent implements OnInit {
  product$!: Observable<ProductInterface>;
  textDescription!: string;
  private productDescription!: string;
  isTextTruncated: boolean = false;

  constructor(private parent: ProductsPageComponent) { }

  ngOnInit(): void {
    this.product$ = this.parent.product$.pipe(
      tap(product => {
        this.productDescription = product.description;
        if(this.productDescription.length > 200) {
          this.textDescription = this.productDescription.slice(0, 200) + '...';
          this.isTextTruncated = true;
        }
      })
    );
  }

  displayText(): void {
    this.textDescription = this.isTextTruncated ? this.productDescription : this.productDescription.slice(0, 200) + '...';
    console.log(this.isTextTruncated)
    this.isTextTruncated = !this.isTextTruncated;
  }
}

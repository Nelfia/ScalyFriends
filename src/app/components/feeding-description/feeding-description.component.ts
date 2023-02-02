import { Component, OnInit } from '@angular/core';
import { ProductsPageComponent } from "../products-page/products-page.component";
import {ProductInterface} from "../../shared/interfaces/product.interface";

@Component({
  selector: 'app-feeding-description',
  templateUrl: './feeding-description.component.html',
  styleUrls: ['./feeding-description.component.scss']
})
export class FeedingDescriptionComponent implements OnInit {
  public product: ProductInterface|null = null;
  public descriptionText: string|undefined = "";
  public isTextTruncated: boolean = false;

  constructor(private parent: ProductsPageComponent) { }

  ngOnInit(): void {
    this.product = this.parent.product ?? null;
    if(this.product && this.product.description.length >= 200) {
      this.descriptionText = this.product.description.slice(0, 200) + '...';
      this.isTextTruncated = true;
    }
  }

  displayText(): void {
    this.descriptionText = this.isTextTruncated ? this.product?.description : this.product?.description.slice(0, 200) + '...';
    console.log(this.isTextTruncated)
    this.isTextTruncated = !this.isTextTruncated;
  }
}

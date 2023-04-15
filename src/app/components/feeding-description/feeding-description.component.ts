import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../shared/interfaces/product.interface";

@Component({
  selector: 'app-feeding-description',
  templateUrl: './feeding-description.component.html',
  styleUrls: ['./feeding-description.component.scss']
})
export class FeedingDescriptionComponent implements OnInit {
  @Input() product!: ProductInterface;
  textDescription!: string | undefined;
  private productDescription!: string;
  isTextTruncated: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.productDescription = this.product.description ?? '';
    if (this.productDescription?.length > 200) {
      this.textDescription = this.productDescription?.slice(0, 200) + '...';
      this.isTextTruncated = true;
    }
  }

  displayText(): void {
    this.textDescription = this.isTextTruncated ? this.productDescription : this.productDescription?.slice(0, 200) + '...';
    console.log(this.isTextTruncated)
    this.isTextTruncated = !this.isTextTruncated;
  }
}

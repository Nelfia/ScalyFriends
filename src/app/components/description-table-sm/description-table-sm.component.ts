import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-description-table-sm',
  templateUrl: './description-table-sm.component.html',
  styleUrls: ['./description-table-sm.component.scss']
})
export class DescriptionTableSmComponent implements OnInit {
  @Input() product!: ProductInterface;
  textDescription!: string | undefined;
  private productDescription!: string;
  isTextTruncated: boolean = false;
  isTooLongText: boolean = false;
  public productFields!: any;

  constructor() { }

  ngOnInit(): void {
    this.productFields = this.getFields();
    this.productDescription = this.product.description ?? '';
    if (this.productDescription?.length > 200) {
      this.isTooLongText = true;
      this.textDescription = this.productDescription?.slice(0, 200) + '...';
      this.isTextTruncated = true;
    }
  }

  displayText(): void {
    this.textDescription = this.isTextTruncated ? this.productDescription : this.productDescription?.slice(0, 200) + '...';
    console.log(this.isTextTruncated)
    this.isTextTruncated = !this.isTextTruncated;
  }

  getFields(): any {
    let result : any = null;
    switch (this.product.category) {
      case "animal":
        result = {
          type: this.product.type,
          "espèce": this.product.species,
          race: this.product.race,
          sexe: this.product.gender === "M" ? "Mâle" : "Femelle",
          naissance: this.product.birth,
          "taille adulte": `${this.product.dimensionsMax} ${this.product.dimensionsUnit}`
        }
        break;
      case "material":
        result = {
          "marque": this.product.species,
          type: this.product.type,
          "taille": `${this.product.dimensionsMax} ${this.product.dimensionsUnit}`,
          [this.product.specification]: `${this.product.specificationValue} ${this.product.specificationUnit}`
        }
        break;
      case "feeding":
        result = {
          "marque": this.product.species,
          "contenu": `${this.product.dimensionsMax} ${this.product.dimensionsUnit}`,
          [this.product.specification]: `${this.product.specificationValue} ${this.product.specificationUnit}`
        }
        break;
    }
    return result;
  }

  public onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>) : number {
    return -1;
  }

}

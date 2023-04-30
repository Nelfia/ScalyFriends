import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from "../../shared/interfaces/product.interface";

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

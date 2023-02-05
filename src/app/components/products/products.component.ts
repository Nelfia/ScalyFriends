import { Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public apiBaseUrl = API_BASE_URL;
  constructor(protected route: ActivatedRoute, protected router: Router) { }


}

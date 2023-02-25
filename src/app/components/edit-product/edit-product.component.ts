import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productForm$!: Observable<ProductInterface>;
  category$!: Observable<string>;
  img: string = '';
  categories = [
    "Animal",
    "Matériel",
    "Alimentation"
  ]
  units = [
    "mm",
    "cm",
    "m"
  ]
  genders = [
    {name: 'femelle', abbrev: 'f'},
    {name: 'mâle', abbrev: 'm'}
  ]
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: "",
      birth: 0,
      dimensionsMax: 0,
      dimensionsUnit: ["", Validators.required],
      gender: "",
      img: "",
      isVisible: false,
      name: "",
      price: 0,
      race: "",
      ref: "",
      requiresCertification: false,
      species: "",
      specification: "",
      specificationUnit: "",
      specificationValue: 0,
      stock: 0,
      type: ""
    })
    this.productForm$ = this.productForm.valueChanges;
    this.category$ = this.productForm$.pipe(
      map(formValue => {
        console.log(formValue.category)
        console.log(this.getBase64(this.productForm.value))

        return formValue.category;
      })
    )
  }

  handleImgInput(file: any) {
    this.getBase64(file[0]).subscribe(str => this.img = str);
  }
  getBase64(imgInput: any): Observable<string> {
    return new Observable<string>(sub => {
      const reader = new FileReader();
      reader.readAsDataURL(imgInput);
      reader.onload = () => {
        sub.next(reader.result?.toString());
        sub.complete();
      };
      reader.onerror = error => {
        sub.error(error);
      };
    })
  }
  onSubmitForm() : void {
    console.log((this.productForm.value))
  }


}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productForm$!: Observable<ProductInterface>;
  category$!: Observable<string>;
  name$!: Observable<string>;
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
      type: "",
      name: "",
      description: "",
      birth: 0,
      dimensionsMax: 0,
      dimensionsUnit: ["", Validators.required],
      gender: "",
      species: "",
      race: "",
      img: "",
      price: 0,
      requiresCertification: false,
      specification: "",
      specificationValue: 0,
      specificationUnit: "",
      stock: 0
    })
    this.productForm$ = this.productForm.valueChanges;
    this.category$ = this.productForm$.pipe(
      map(formValue => {
        formValue.category;
        return formValue.category;
      })
    )
    this.name$ = this.productForm$.pipe(
      map(formValue => {
        formValue.name;
        return formValue.name;
      })
    )
  }
  // TODO : Sécurisation image côté back + envoie uniquement au submit
  //  + enregistrer l'image aves le nom du produit.
  onSubmitForm() : void {
    console.log((this.productForm.value))
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductInterface} from "../../shared/interfaces/product.interface";
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {ProductsService} from "../../shared/services/products/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  productForm!: FormGroup;
  productForm$!: Observable<ProductInterface>;
  category$!: Observable<string>;
  name$!: Observable<string>;
  imgBase64!: string;
  categories = [
    {name: "Animal", value: "animal"},
    {name: "Matériel", value: "material"},
    {name: "Alimentation", value: "feeding"}
  ]
  units = [
    "mm",
    "cm",
    "m"
  ]
  genders = [
    {name: 'femelle', abbrev: 'F'},
    {name: 'mâle', abbrev: 'M'}
  ]
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private router: Router) { }

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
  //  + enregistrer l'image avec le nom du produit.
  onSubmitForm() : void {
    const product : ProductInterface = this.productForm.value;
    console.log((this.productForm.value))

    this.productsService.editProduct(product, this.imgBase64).pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        switch (product.category) {
          case "Animal" :
            this.productsService.getAnimals();
            break;
          case "Matériel": this.productsService.getMaterials();
            break;
          case "Alimentation": this.productsService.getFeeding();
            break;
          default:
            break;
        }
        this.router.navigateByUrl('/' + (product.category.charAt(0).toUpperCase().slice(1)) + 's');
      }
    );
  }

  setImgBase64(imgBase64: string) : void {
    this.imgBase64 = imgBase64;
    console.log(this.imgBase64)
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}

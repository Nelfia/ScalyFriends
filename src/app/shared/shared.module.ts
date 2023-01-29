import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AnimalsResolver} from "./resolvers/animals.resolver";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedModule,
    AnimalsResolver
  ]
})
export class SharedModule { }

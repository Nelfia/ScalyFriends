import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { ProductsComponent } from './products/products.component';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from '@angular/common/http';
import { MaterialPageComponent } from './material-page/material-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderAppComponent,
    ProductsComponent,
    MaterialPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

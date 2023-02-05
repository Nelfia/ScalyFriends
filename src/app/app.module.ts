import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderAppComponent } from './components/header-app/header-app.component';
import { ProductsComponent } from './components/products/products.component';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { AnimalDescriptionComponent } from './components/animal-description/animal-description.component';
import { MaterialDescriptionComponent } from './components/material-description/material-description.component';
import { FeedingDescriptionComponent } from './components/feeding-description/feeding-description.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './cart/cart.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderAppComponent,
    ProductsComponent,
    ProductsPageComponent,
    AnimalDescriptionComponent,
    MaterialDescriptionComponent,
    FeedingDescriptionComponent,
    LoginComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

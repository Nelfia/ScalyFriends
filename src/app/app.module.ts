import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderAppComponent} from './components/header-app/header-app.component';
import {ProductsComponent} from './components/products/products.component';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ProductsPageComponent} from './components/products-page/products-page.component';
import {AnimalDescriptionComponent} from './components/animal-description/animal-description.component';
import {MaterialDescriptionComponent} from './components/material-description/material-description.component';
import {FeedingDescriptionComponent} from './components/feeding-description/feeding-description.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {CartComponent} from './components/cart/cart.component';
import {httpInterceptorProviders} from "./shared/interceptors";
import {CartLineComponent} from './components/cart-line/cart-line.component';
import { SigninComponent } from './components/signin/signin.component';
import { ConnexionPageComponent } from './components/connexion-page/connexion-page.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import {ImageUploadModule} from "./shared/image-upload/image-upload.module";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';

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
    CartComponent,
    CartLineComponent,
    SigninComponent,
    ConnexionPageComponent,
    EditProductComponent,
    AboutUsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    ...httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

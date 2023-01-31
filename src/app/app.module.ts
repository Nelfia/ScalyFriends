import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { ProductsComponent } from './products/products.component';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ProductsPageComponent } from './products-page/products-page.component';
import { AnimalDescriptionComponent } from './animal-description/animal-description.component';
import { MaterialDescriptionComponent } from './material-description/material-description.component';
import { FeedingDescriptionComponent } from './feeding-description/feeding-description.component';
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
    FeedingDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
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

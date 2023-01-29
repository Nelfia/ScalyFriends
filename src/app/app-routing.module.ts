import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProductsComponent} from "./products/products.component";
import {AnimalsResolver} from "./shared/resolvers/animals.resolver";
import {StuffResolver} from "./shared/resolvers/stuff.resolver";
import {FeedingResolver} from "./shared/resolvers/feeding.resolver";
import {MaterialPageComponent} from "./material-page/material-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'animal',
    component: ProductsComponent,
    resolve: {
      products: AnimalsResolver
    }
  },


  {
    path: 'material',
    component: ProductsComponent,
    resolve: {
      products: StuffResolver
    }
  },
  {
    path: 'material/:id',
    component: MaterialPageComponent
  },


  {
    path: 'feeding',
    component: ProductsComponent,
    resolve: {
      products: FeedingResolver
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

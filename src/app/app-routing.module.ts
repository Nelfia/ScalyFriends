import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {AnimalsResolver} from "./shared/resolvers/animals.resolver";
import {StuffResolver} from "./shared/resolvers/stuff.resolver";
import {FeedingResolver} from "./shared/resolvers/feeding.resolver";
import {ProductsPageComponent} from "./components/products-page/products-page.component";
import {LoginComponent} from "./components/login/login.component";
import {CartComponent} from "./components/cart/cart.component";
import {SigninComponent} from "./components/signin/signin.component";
import {ConnexionPageComponent} from "./components/connexion-page/connexion-page.component";

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
    path: 'animal/:id',
    component: ProductsPageComponent,
    data: {
      category: 'animals'
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
    component: ProductsPageComponent,
    data: {
      category: 'materials'
    }
  },
  {
    path: 'feeding',
    component: ProductsComponent,
    resolve: {
      products: FeedingResolver
    },
  },
  {
    path: 'feeding/:id',
    component: ProductsPageComponent,
    data: {
      category: 'feeding'
    }
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'connexion',
    component: ConnexionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

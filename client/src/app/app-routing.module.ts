import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from './views/home/home.component';
import { CatalogComponent } from './views/catalog/catalog.component';
import { CartComponent } from './views/cart/cart.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'catalog/oil-and-grease',
      component: CatalogComponent
    },
    {
      path: 'cart',
      component: CartComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  HomeComponent
];

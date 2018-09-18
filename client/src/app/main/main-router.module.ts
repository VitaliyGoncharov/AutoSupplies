import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { HomeComponent } from "../views/home/home.component";
import { CatalogComponent } from "../views/catalog/catalog.component";
import { CartComponent } from "../views/cart/cart.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { ProfileComponent } from "../views/user/profile/profile.component";
import { LoginComponent } from "../views/user/login/login.component";
import { OrderGuard } from "../core/guards/order.guard";
import { OrdersListComponent } from "../views/manager/order/orders-list/orders-list.component";
import { OrderDetailsComponent } from "../views/manager/order/order-details/order-details.component";
import { OrderEditComponent } from "../views/manager/order/order-edit/order-edit.component";
import { OrderAddItemComponent } from "../views/manager/order/order-add-item/order-add-item.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { OrdersResolver } from "../core/resolvers/orders.resolver";
import { OrderResolver } from "../core/resolvers/order.resolver";
import { UserResolver } from "../core/resolvers/user.resolver";
import { ItemsResolver } from "../core/resolvers/items.resolver";
import { ItemsCartResolver } from "../core/resolvers/items-cart.resolver";
import { SearchComponent } from "../views/search/search.component";
import { CatalogsResolver } from "../core/resolvers/catalogs.resolver";
import { CatalogsListComponent } from "../views/catalogs-list/catalogs-list.component";

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        resolve: { catalogs: CatalogsResolver },
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'search', component: SearchComponent },
            {
                path: 'cart',
                component: CartComponent,
                resolve: { items: ItemsCartResolver, user: UserResolver }
            },
            {
                path: 'catalog/list/:catalog',
                component: CatalogsListComponent
            },
            {
                path: 'catalog/:title',
                component: CatalogComponent,
                resolve: { items: ItemsResolver }
            },
            { 
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard],
                resolve: { user: UserResolver}
            },
            {
                path: 'manager',
                canActivateChild: [AuthGuard, OrderGuard],
                children: [
                    { path: '', redirectTo: '/' , pathMatch: 'full' },
                    { path: 'orders', component: OrdersListComponent, resolve: { orders: OrdersResolver} },
                    { path: 'order/:id/details', component: OrderDetailsComponent, resolve: { order: OrderResolver } },
                    { path: 'order/:id/edit', component: OrderEditComponent, resolve: { order: OrderResolver } }
                ]
            }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRouterModule { }
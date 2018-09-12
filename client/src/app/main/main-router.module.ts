import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { HomeComponent } from "../views/home/home.component";
import { CatalogComponent } from "../views/catalog/catalog.component";
import { CartComponent } from "../views/cart/cart.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { ProfileComponent } from "../views/user/profile/profile.component";
import { LogoutComponent } from "../views/user/logout/logout.component";
import { LoginComponent } from "../views/user/login/login.component";
import { OrderGuard } from "../core/guards/order.guard";
import { OrdersListComponent } from "../views/manager/order/orders-list/orders-list.component";
import { OrderDetailsComponent } from "../views/manager/order/order-details/order-details.component";
import { OrderEditComponent } from "../views/manager/order/order-edit/order-edit.component";
import { OrderAddItemComponent } from "../views/manager/order/order-add-item/order-add-item.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { OrdersResolver } from "../core/resolvers/orders.resolver";
import { OrderResolver } from "../core/resolvers/order.resolver";

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'catalog/oil-and-grease', component: CatalogComponent },
            { path: 'cart', component: CartComponent },
            { path: 'login', component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
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
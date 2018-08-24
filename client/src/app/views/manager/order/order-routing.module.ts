import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderComponent } from "./order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderEditComponent } from "./order-edit/order-edit.component";
import { OrderAddItemComponent } from "./order-add-item/order-add-item.component";
import { OrderGuard } from "../../../core/guards/order.guard";


export const routes: Routes = [
    {
        path: 'manager',
        component: OrderComponent,
        children: [
            { path: '', redirectTo: '/' , pathMatch: 'full' },
            // { path: '', component: PageNotFoundComponent }
            { path: 'orders', component: OrdersListComponent },
            { path: 'order/:id/details', component: OrderDetailsComponent },
            { path: 'order/edit', component: OrderEditComponent, canActivate: [OrderGuard] },
            { path: 'order/item/add', component: OrderAddItemComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
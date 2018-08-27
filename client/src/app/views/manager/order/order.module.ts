import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderAddItemComponent } from './order-add-item/order-add-item.component';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderComponent,
    OrdersListComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    OrderAddItemComponent
  ]
})
export class OrderModule { }

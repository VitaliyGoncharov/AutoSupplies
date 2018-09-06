import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderAddItemComponent } from './order-add-item/order-add-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrdersListComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    OrderAddItemComponent
  ]
})
export class OrderModule { }

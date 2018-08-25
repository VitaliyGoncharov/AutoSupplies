import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/interfaces/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  private orders: Array<Order>;

  constructor(private orderS: OrderService, private _router: Router) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderS.findAll().subscribe((data: Array<Order>) => {
      this.orders = data.map(order => {
        switch(order.status) {
          case 1: {
            order.status = "В обработке";
            break;
          }
          case 2: {
            order.status = "Собран";
            break;
          }
        }
        return order;
      });
    });
  }

  goToOrderDetails(event) {
    let id = event.target.closest('.order').dataset.orderId;
    return this._router.navigate(['/manager/order/details',{id: id}]);
  }
}

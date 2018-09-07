import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, ParamMap, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { of, ObservableInput } from 'rxjs';
import { Order } from '../../../../core/interfaces/order';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  private order: Order;
  private orderId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderS: OrderService
  ) { }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderS.findById(this.orderId).subscribe((order: Order) => {
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
        this.order = order;
    })
  }

  goToOrderEditor(event) {
    return this.router.navigate(['/manager/order/edit',{id: this.orderId}]);
  }

}

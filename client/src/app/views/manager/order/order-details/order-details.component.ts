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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderS: OrderService
  ) { }

  ngOnInit() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    let id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderS.findById(id).subscribe((order: Order) => {
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
    let id = this.route.snapshot.paramMap.get('id');
    return this.router.navigate(['/manager/order/edit',{id: id}]);
  }

}

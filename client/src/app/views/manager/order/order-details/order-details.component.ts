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

  order: Order;
  private orderId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderS: OrderService
  ) { }

  ngOnInit() {
    this.order = this.route.snapshot.data['order'];
    this.orderId = this.order.id;
  }

  goToOrderEditor(event) {
    return this.router.navigate(['/manager/order/'+this.orderId+'/edit']);
  }
}

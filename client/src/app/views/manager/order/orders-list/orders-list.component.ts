import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/interfaces/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  orders: Array<Order>;

  constructor(
    private orderS: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orders = this.route.snapshot.data['orders'];
  }

  goToOrderDetails(event) {
    let id = event.target.closest('.order').dataset.orderId;
    return this.router.navigate(['/manager/order/'+id+'/details']);
  }
}

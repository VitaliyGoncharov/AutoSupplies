import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Order } from '../interfaces/order';
import { OrderService } from '../services/order.service';

@Injectable()
export class OrdersResolver implements Resolve<any> {

    constructor(private orderS: OrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Order>> {
        return new Promise( (res, rej) => {
            this.orderS.findAll().subscribe(data => {
                return res(this.orderS.translateOrdersStatus(data));
            }, error => rej());
        });
    }

    
}
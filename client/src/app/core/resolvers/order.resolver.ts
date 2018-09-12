import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Order } from "../interfaces/order";
import { OrderService } from "../services/order.service";

@Injectable()
export class OrderResolver implements Resolve<any> {

    constructor(private orderS: OrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Order> {
        let orderId = Number.parseInt(route.paramMap.get('id'));
        console.log("[OrderResolver]");
        return new Promise( (res, rej) => {
            this.orderS.findById(orderId).subscribe(data => {
                return res(this.orderS.translateOrderStatus(data));
            }, error => rej());
        })
    }
}
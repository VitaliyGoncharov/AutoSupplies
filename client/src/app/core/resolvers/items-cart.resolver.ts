import { Injectable } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Item } from "../interfaces/item";
import { ItemsService } from "../services/items.service";
import { CookieService } from "../services/cookie.service";
import { ItemCookie } from "../interfaces/cookie/item-cookie";

@Injectable()
export class ItemsCartResolver implements Resolve<any> {

    constructor(private itemS: ItemsService, private cookieS: CookieService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Item>> {
        let items: Array<ItemCookie>;
        let cartCookie = this.cookieS.getCookie("cart");

        if (cartCookie) {
            items = JSON.parse(cartCookie);
        }
        
        if (!Array.isArray(items) || !items.length) {
            console.log("[ItemsCartResolver] Cart info of wrong formate");
            return;
        }

        let itemsIds = items.map(item => item.id);

        return new Promise( (res, rej) => {
            this.itemS.findAllById(itemsIds).subscribe(data => res(data), error => rej(error));
        });
    }
}
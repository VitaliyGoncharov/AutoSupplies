import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ItemsService } from "../services/items.service";
import { Item } from "../interfaces/item";

@Injectable()
export class ItemsResolver implements Resolve<any> {

    constructor(private itemS: ItemsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Item>> {
        let catName = route.paramMap.get('title');
        let page = Number.parseInt(route.paramMap.get('page'));
        let limit = 3;
        console.log("[ItemsResolver] Page: ", page);
        console.log("[ItemResolver] Default limit: ", limit);
        return new Promise( (res, rej) => {
            this.itemS.findPortion(catName, page, limit).subscribe(data => res(data), error => rej(error));
        });
    }
}
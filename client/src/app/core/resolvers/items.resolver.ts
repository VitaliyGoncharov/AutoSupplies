import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ItemsService } from "../services/items.service";
import { Item } from "../interfaces/item";

@Injectable()
export class ItemsResolver implements Resolve<any> {

    constructor(private itemS: ItemsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<Item>> {
        let catalogTitle = route.paramMap.get('title');
        console.log("[ItemsResolver] Title: ", catalogTitle);
        return new Promise( (res, rej) => {
            this.itemS.findAll(catalogTitle).subscribe(data => res(data), error => rej(error));
        });
    }
}
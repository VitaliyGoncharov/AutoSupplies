import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CatalogService } from "../services/catalog.service";
import { CatalogRes } from "../interfaces/res/catalog";

@Injectable()
export class CatalogsResolver implements Resolve<any> {

    constructor(private catalogS: CatalogService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<CatalogRes>> {
        console.log("[CatalogResolver]");
        return new Promise( (res, rej) => {
            this.catalogS.getAll().subscribe(data => res(data), error => rej(error));
        });
    }
}
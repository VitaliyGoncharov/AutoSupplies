import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    private OIL     = "oil";
    private GREASE  = "grease";
    private BATTERY = "battery";
    private TIRE    = "tire";
    private WHEEL_DISKS = "wheel_disks";

    // /api/items
    private _url_GET_ITEMS_BY_IDS = "/assets/catalog/oil-and-grease.json";

    constructor(private http: HttpClient) {}

    getItems(_url) {
        return this.http.get(_url);
    }

    getItemsByIds(ids) {
        let params = new HttpParams();
        params.set("ids",ids.join(","));
        let options = {
            params: params
        }
        return this.http.get(this._url_GET_ITEMS_BY_IDS, options);
    }
}
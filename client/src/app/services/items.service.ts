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

    constructor(private http: HttpClient) {}

    findAll(_url) {
        return this.http.get(_url);
    }

    findAllById(_url, ids) {
        let params = new HttpParams().set('ids',ids.join(","));
        let options = {
            params: params
        }
        return this.http.get(_url, options);
    }
}
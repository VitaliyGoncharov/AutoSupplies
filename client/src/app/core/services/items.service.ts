import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Item } from "../interfaces/item";
import { CookieService } from "./cookie.service";
import { ItemCookie } from "../interfaces/cookie/item-cookie";
import { ItemContainer } from "../interfaces/item-container";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {

    headers = new HttpHeaders({
        'Content-Type':"application/json"
    });

    private FIND_BY_IDS = "/api/products";
    private CATALOG = "/api/catalog/";
    private GET_BY_CATALOG_NAME_AND_PAGE = "/api/catalog/items/";
    private FIND_BY_KEYWORD = "/api/search/product";
    private GET_AMOUNT_BY_CATALOG_TITLE = ["/api/catalog/","/items/count"];

    constructor(private http: HttpClient, private cookieS: CookieService) {}

    findAll(catalogTitle: string) {
        let _url = this.CATALOG.concat(catalogTitle);
        return this.http.get<Array<Item>>(_url);
    }

    findByKeyword(keyword: string) {
        let body = { "keyword": keyword }
        let options = {
            headers: this.headers
        }
        return this.http.post<Array<Item>>(this.FIND_BY_KEYWORD, body, options);
    }

    findAllById(ids) {
        let params = new HttpParams().set('ids',ids.join(","));
        let options = {
            params: params
        }
        return this.http.get<Array<Item>>(this.FIND_BY_IDS, options);
    }

    getAmountByCatalogName(catalogTitle: string) {
        let _url = this.GET_AMOUNT_BY_CATALOG_TITLE[0]
            .concat(catalogTitle)
            .concat(this.GET_AMOUNT_BY_CATALOG_TITLE[1]);
        return this.http.get<number>(_url);
    }

    /**
     * Transform Array<Item> to Array<ItemContainer> filling with the items amount from cookie "cart"
     * 
     * @param itemsDB 
     */
    mapItems(itemsDB: Array<Item>): Array<ItemContainer> {
        let mappedItems: Array<ItemContainer> = [];
        let itemsCookie: Array<ItemCookie> = this.getItemsFromCookies();

        for (let i = 0; i < itemsDB.length; i++) {
            mappedItems[i] = { product: itemsDB[i], amount: null };
        }

        for (let item of mappedItems) {
            // amount of item is in cookie
            let itemCookie = itemsCookie.find(itemCookie => itemCookie.id == item.product.id);
            if (itemCookie)
                item.amount = itemCookie.amount;
        }

        return mappedItems;
    }

    getItemsFromCookies() {
        let itemsCookie: Array<ItemCookie>;
        let cartCookie = this.cookieS.getCookie("cart");

        if (cartCookie) {
            itemsCookie = JSON.parse(cartCookie);
        }
        
        if (!Array.isArray(itemsCookie) || !itemsCookie.length) {
            console.error("[ItemsService] Cart info of wrong formate");
            return;
        }
        return itemsCookie;
    }
}
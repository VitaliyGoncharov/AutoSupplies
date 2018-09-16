import { Component, Input, OnInit } from "@angular/core";
import { Item } from "../../core/interfaces/item";
import { SearchService } from "../../core/services/search.service";
import { CookieService } from "../../core/services/cookie.service";

@Component({
    selector: 'main-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    
    results: Array<Item> = [];

    constructor(private searchS: SearchService, private cookieS: CookieService) {}

    ngOnInit() {
        console.log("[SearchComponent] NgOnInit");
        this.searchS.searchResults.subscribe(results => {
            console.log("[SearchComponent] In subscription");
            if (results)
                this.results = results;
        })
    }

    addItemToCart(itemId) {
        let items: Array<{id: number, amount: number}>;
        let cartVal = this.cookieS.getCookie("cart");

        if (cartVal != "") {
            items = JSON.parse(cartVal);
        } else {
            items = [];
        }

        items.push({
            id: itemId,
            amount: 1
        });
        this.cookieS.setCookie("cart", JSON.stringify(items));
    }

    isInCart(item: Item) {
        let cart = this.cookieS.getCookie("cart");

        if (!cart) {
            return false;
        }

        let items: Array<{id: number, amount: number}> = JSON.parse(this.cookieS.getCookie("cart"));

        let match = items.find(x => x.id == item.id);
        if (match)
            return true;

        return false;
    }
}
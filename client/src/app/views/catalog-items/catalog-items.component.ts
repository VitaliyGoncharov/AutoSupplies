import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../../core/services/items.service';
import { Item } from '../../core/interfaces/item';
import { CookieService } from '../../core/services/cookie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.css']
})
export class CatalogItemsComponent implements OnInit {

  items: Array<Item> = [];

  constructor(
    private itemsS: ItemsService,
    private cookieS: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.items = this.route.snapshot.data['items'];
    }); 
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

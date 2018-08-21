import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemsService } from '../services/items.service';
import { Item } from '../interfaces/item';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private _url = "/api/catalog/oil-and-grease";
  // private _url = "/assets/catalog/oil-and-grease.json";

  items: Array<Item> = [];

  constructor(private itemsS: ItemsService, private cookieS: CookieService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.itemsS.findAll(this._url).subscribe( data  => {
      this.items = <Array<Item>> data;
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

    for (let itemIterable of items) {
      if (item.id == itemIterable.id) {
        return true;
      }
    }
    return false;
  }
}

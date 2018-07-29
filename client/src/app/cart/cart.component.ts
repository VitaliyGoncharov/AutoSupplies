import { Component, OnInit } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { ItemsService } from '../services/items.service';
import { Item } from '../interfaces/item';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private items: Array<Item> = [];
  private totalPrice: number;

  constructor(private cookieS: CookieService, private itemsS: ItemsService) { }

  ngOnInit() {
    // $('[data-toggle="tooltip"]').tooltip will not work
    // 'cause items are added to page dynamically
    // and there is a delay of getting items info from the server
    // $("body").tooltip({
    //   selector: '[data-toggle="tooltip"]'
    // });

    this.getItems();
  }

  getItems() {
    let items;
    let cartCookie = this.cookieS.getCookie("cart");

    if (cartCookie) {
      items = JSON.parse(cartCookie);
    }
    
    if (!Array.isArray(items) || !items.length) {
      return;
    }
    
    let itemsIds = items.map(item => item.id);
    this.itemsS.getItemsByIds(itemsIds).subscribe( data => {
      for (let key of Object.keys(data)) {
        // find match the item in cookie and item from database
        // item from DB is data[key], items from cookie is items
        for (let item of items) {
          if (item.id == data[key].id) {
            data[key].amount = item.amount;
            this.items.push(data[key]);
          }
        }
      }
    }, null, () => {
      this.countTotalPrice();
    });
  }

  plusItem(event) {
    let itemBlock = event.target.closest(".item");
    let itemPrice = itemBlock.dataset.itemPrice;
    let itemId = itemBlock.dataset.itemId;

    // update amount of item in cookie (when user reload the page amount will be read from cookie)
    this.changeAmountInCookie(event, null, {increment: true});
    
    // update amount in view 
    for (let item of this.items) {
      if (item.id == itemId) {
        item.amount = ++item.amount;
      }
    }

    this.countTotalPrice();
  }

  minusItem(event) {
    let amountInput = event.target.closest(".item").getElementsByClassName("item-amount")[0];
    let amount = amountInput.value;

    if (amount == 1) {
      // alert("Amount can't be less than 1. Use trash button to remove item from cart");
      $(amountInput).tooltip('show');
      setTimeout(function () {
        $(amountInput).tooltip('hide');
      }, 1500);
      return;
    }
    
    let itemBlock = event.target.closest(".item");
    let itemPrice = itemBlock.dataset.itemPrice;
    let itemId = itemBlock.dataset.itemId;

    // update amount of item in cookie (when user reload the page amount will be read from cookie)
    this.changeAmountInCookie(event, null, {decrement: true});
    
    // update amount in view 
    for (let item of this.items) {
      if (item.id == itemId) item.amount -= 1;
    }

    this.countTotalPrice();
  }

  changeAmount(event) {
    let amount = this.validateAmount(event.target.value);
    
    if (!amount) {
      console.log("Empty value");
      $(event.target).tooltip('show');
      return;
    }
    event.target.value = amount;
    $(event.target).tooltip('hide');
    
    this.changeAmountInCookie(event, amount);
    this.updatePrice(event, amount);
    this.countTotalPrice();
  }

  changeAmountInCookie(event, amount?, flags?: {increment?: boolean, decrement?: boolean}) {
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;
    let inputedAmount: number;

    inputedAmount = amount ? amount : event.target.value;

    // update amount of item in cookie (when user reload the page amount will be read from cookie)
    let items: Array<{id: number, amount: number}> = JSON.parse(this.cookieS.getCookie("cart"));
    for (let item of items) {
      if (item.id == itemId) {
        if (flags) {
          if (flags.increment) item.amount = ++item.amount;
          if (flags.decrement) item.amount = --item.amount;
        }
        
        if (!flags) item.amount = inputedAmount;
      }
    }
    this.cookieS.setCookie("cart", JSON.stringify(items));
  }

  updatePrice(event, amount?) {
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;
    let inputedAmount;

    inputedAmount = amount ? amount : event.target.value;

    // update amount in view 
    for (let item of this.items) {
      if (item.id == itemId) {
        item.amount = inputedAmount;
      }
    }
  }

  validateAmount(amount) {
    if (!amount) return "";
    let matches = amount.match(/\d+/g);
    if (!matches) return "";
    return matches.join("");
  }

  autoCorrectNullVal(event) {
    $(event.target).tooltip('hide');
    let itemBlock, itemId;
    if (event.target.value == "" || event.target.value  == 0) {
      event.target.value = 1;
      itemBlock = event.target.closest(".item");
      itemId = itemBlock.dataset.itemId;

      console.log("Value cannot be null");
      console.log("Amount was autocorrected to 1 for item: " + itemId);

      this.changeAmountInCookie(event, 1);
      this.updatePrice(event, 1);
    }
  }

  // getTotalItemPrice(total, item) {
  //   let itemPrice;
  //   for (let itemI of this.items) {
  //     if (item.id == itemI.id) itemPrice = itemI.price;
  //   }
  //   let totalItemPrice = item.price * itemPrice;
  //   return total + totalItemPrice;
  // }

  countTotalPrice() {
    this.totalPrice = this.items.reduce(function (total, item) {
      let totalItemPrice = item.amount * item.price;
      return total + totalItemPrice;
    }, 0);
  }

  removeItem(event) {
    let item = event.target.closest(".item");
    let itemId = item.dataset.itemId;

    let items: Array<{id: number, amount: number}> = JSON.parse(this.cookieS.getCookie("cart"));
    for (let item of items) {
      if (item.id == itemId) {
        let index = items.indexOf(item);
        if (index > -1) items.splice(index, 1);
      }
    }
    this.cookieS.setCookie("cart", JSON.stringify(items));

    for (let itemI of this.items) {
      if (itemI.id == itemId) {
        let index = this.items.indexOf(itemI);
        if (index > -1) this.items.splice(index, 1);
      }
    }
    this.countTotalPrice();
  }
}

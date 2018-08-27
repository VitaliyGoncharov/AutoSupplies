import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../core/services/cookie.service';
import { ItemsService } from '../../core/services/items.service';
import { Item } from '../../core/interfaces/item';
import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Array<{product: Item, amount: number}> = [];
  totalPrice: number;
  
  orderNumber: number;

  private _url_get_all = "/api/catalog/oil-and-grease";
  private _url_get_all_by_ids = "/api/catalog/oil-and-grease/specific";
  // private _url = "/assets/catalog/oil-and-grease.json";

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

    console.log("In get items");
    console.log(cartCookie);

    if (cartCookie) {
      items = JSON.parse(cartCookie);
    }

    console.log(items);
    
    if (!Array.isArray(items) || !items.length) {
      console.log("Isn't array or null");
      return;
    }
    
    let itemsIds = items.map(item => item.id);
    this.itemsS.findAllById(this._url_get_all_by_ids, itemsIds).subscribe( (data: Array<Item>) => {
        for (let i = 0; i < data.length; i++) {
          this.items[i].product = data[i];
        }
        console.log("Data was fetched");

        for (let item of this.items) {
          // amount of item is in cookie
          for (let itemFromCookie of items) {
            if (item.product.id == itemFromCookie.id) {
              item.amount = itemFromCookie.amount;
              break;
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
      if (item.product.id == itemId) {
        item.amount = ++item.amount;
      }
    }

    this.countTotalPrice();
  }

  minusItem(event) {
    let amountInput = event.target.closest(".item").getElementsByClassName("count")[0];
    let amount = amountInput.value;

    if (amount == 1) {
      // alert("Amount can't be less than 1. Use trash button to remove item from cart");
      // $(amountInput).tooltip('show');
      // setTimeout(function () {
      //   $(amountInput).tooltip('hide');
      // }, 1500);
      return;
    }
    
    let itemBlock = event.target.closest(".item");
    let itemPrice = itemBlock.dataset.itemPrice;
    let itemId = itemBlock.dataset.itemId;

    // update amount of item in cookie (when user reload the page amount will be read from cookie)
    this.changeAmountInCookie(event, null, {decrement: true});
    
    // update amount in view 
    for (let item of this.items) {
      if (item.product.id == itemId) item.amount -= 1;
    }

    this.countTotalPrice();
  }

  changeAmount(event) {
    
    let amount = event.target.value;
    
    // if "Backspace" was pressed
    if (event.keyCode == 8) {
      console.log("Backspace was pressed!");
      console.log(amount);
      amount = amount.substr(0,amount.length-1);
      console.log(amount);
      this.changeAmountInCookie(event, amount);
      this.updatePrice(event, amount);
      this.countTotalPrice();
      return false;
    }

    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("You pressed key of type number");
      amount = amount + event.key;
      this.changeAmountInCookie(event, amount);
      this.updatePrice(event, amount);
      this.countTotalPrice();
      return false;
    }

    return false;
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
      if (item.product.id == itemId) {
        item.amount = inputedAmount;
      }
    }
  }

  countTotalPrice() {
    this.totalPrice = this.items.reduce(function (total, item) {
      let totalItemPrice = item.amount * item.product.price;
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
      if (itemI.product.id == itemId) {
        let index = this.items.indexOf(itemI);
        if (index > -1) this.items.splice(index, 1);
      }
    }
    this.countTotalPrice();
  }

  toggleAddress(event) {
    let input: HTMLInputElement = <HTMLInputElement> document.getElementById('address');
    console.log(document.getElementById('address'));
    if (input.hasAttribute("disabled")) {
      input.removeAttribute("disabled");
    } else {
      input.setAttribute("disabled","");
      input.value = "В пункт самовывоза";
    }
  }

  toStep2() {
    (<HTMLElement>document.querySelector('#cart-container')).style.display = "none";
    (<HTMLElement>document.querySelector('.order-container')).style.display = "grid";
    (<HTMLElement>document.querySelector('#nav-back')).style.display = "grid";
  }

  toStep1() {
    (<HTMLElement>document.querySelector('#cart-container')).style.display = "grid";
    (<HTMLElement>document.querySelector('.order-container')).style.display = "none";
    (<HTMLElement>document.querySelector('#nav-back')).style.display = "none";
  }

  saveOrder() {
    (<HTMLElement>document.querySelector('#cart-container')).style.display = "none";
    (<HTMLElement>document.querySelector('.order-container')).style.display = "none";
    (<HTMLElement>document.querySelector('#nav-back')).style.display = "none";
    this.orderNumber = 805;
    (<HTMLElement>document.querySelector('#order-info')).style.display = "grid";
  }
}

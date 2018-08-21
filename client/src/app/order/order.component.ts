import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interfaces/order';
import { Item } from '../interfaces/item';
import { CloneVisitor } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { reject } from '../../../node_modules/@types/q';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderS: OrderService) { }

  items: Array<Item> = [];
  curOrderId: number;
  totalPrice: number;

  /*
    It is an array of items that were modified by user.
    He could change amount, delete item or add new item.
    => If user refreshes page or doesn't click save btn, this arr will be cleaned
    => If user presses save btn, this this.tempItems will be compared with this.items
      and if they are not equal then we will send request to server
      to update order items in database
   */
  tempItems: Array<Item> = [];

  /*
    val: ORDER_CONTAINER - page with the list of orders
    val: ORDER_DETAILS - page with order details
    val: ORDER_EDITOR - page where manager can edit order
    */
  prevLoc: string = null;

  private ORDER             = ".order";
  private ORDER_DETAILS     = ".order-details";
  private ORDER_EDITOR      = "#order-editor";
  private ADD_ITEM_PANEL    = "#add-item-panel";
  private ORDERS_CONTAINER  = "#orders-container";
  

  ngOnInit() {
  }

  // сделать завтра
  //
  // изменять totalPrice на minusItem и plustItem
  // сделать, чтобы можно было изменять кол-во с клавиатуры
  // сделаь так, чтобы выводились temp данные вместо this.items
  // добавить товар в this.tempItems при его добавлении
  // найти разницу в массивах, найти уникальные элементы
  // делать запрос к серверу на update продуктов заказа в базе данных

  countTotalPrice() {
    this.totalPrice = this.items.reduce((total, item) => {
      return total + (item.amount * item.price);
    }, 0);
  }

  goBack() {
    switch (this.prevLoc) {
      case this.ORDERS_CONTAINER: {
        this.showOrders();
        break;
      }
      case this.ORDER_DETAILS: {
        this.showOrderDetails();
        break;
      }
      case this.ORDER_EDITOR: {
        this.showOrderEditor();
        break;
      }
    }
  }

  switchToOrders() {
    this.showOrders();
  }

  showOrders() {
    this.prevLoc = null;
    (<HTMLElement>document.querySelector(this.ORDER_DETAILS)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDER_EDITOR)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDERS_CONTAINER)).style.display = "grid";
  }

  switchToOrderDetails(event) {
    this.curOrderId = event.target.closest(this.ORDER).dataset.orderId;
    (<HTMLElement>document.querySelector(this.ORDER_DETAILS)).dataset.orderId = this.curOrderId.toLocaleString();
    this.showOrderDetails();
  }

  showOrderDetails() {
    this.prevLoc = this.ORDERS_CONTAINER;
    (<HTMLElement>document.querySelector(this.ORDERS_CONTAINER)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDER_EDITOR)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDER_DETAILS)).style.display = "grid";
  }

  switchToOrderEditor(event) {

    if(this.items.length) {
      this.showOrderEditor();
      return;
    }

    

    let target = event.target;
    let orderId: number = target.closest(this.ORDER_DETAILS).dataset.orderId;

    this.orderS.findById(orderId).subscribe( data => {
      let order = <Order> data;
      for (let item of order.products) {
        let product = item.product;
        product.amount = item.amount;
        this.items.push(product);

        
        this.tempItems.push(this.clone(product));
      }

      this.countTotalPrice();
      this.showOrderEditor();
    });

    return false;
  }

  showOrderEditor() {
    this.prevLoc = this.ORDER_DETAILS;
    (<HTMLElement>document.querySelector(this.ORDER_DETAILS)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ADD_ITEM_PANEL)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDER_EDITOR)).style.display = "grid";
  }

  switchToAddItemPanel() {
    this.showAddItemPanel();
  }

  showAddItemPanel() {
    this.prevLoc = this.ORDER_EDITOR;
    (<HTMLElement>document.querySelector(this.ORDER_DETAILS)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ORDER_EDITOR)).style.display = "none";
    (<HTMLElement>document.querySelector(this.ADD_ITEM_PANEL)).style.display = "grid";
  }

  minusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems)  {
      if(item.id == itemId) item.amount = --item.amount;
    }
    this.countTotalPrice();
  }

  plusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems) {
      if (item.id == itemId) item.amount = ++item.amount;
    }
    this.countTotalPrice();
  }

  removeItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems) {
      if (item.id == itemId) {
        let index = this.tempItems.indexOf(item);
        if (index > -1) this.tempItems.splice(index, 1);
      }
    }
  }

  // I made it because i need to redirect user only after all items will be updated
  // And all requests to the server will take uncertain time
  checkItem(i:number) {
    return new Promise((res,rej) => {
      let item = this.items[i];
      console.log("Checking item with id: " + item.id);
      let itemExist, amountWasChanged, newAmount;

      for (let tempItem of this.tempItems) {
        if (tempItem.id == item.id) {
          itemExist = true;

          if (tempItem.amount !== item.amount) {
            amountWasChanged = true;
            newAmount = tempItem.amount;
          }
            
          break;
        }
      }

      if (!itemExist) {
        this.orderS.deleteProduct(this.curOrderId, item.id).subscribe(data => {
          console.log("Item with id="+item.id+" was deleted");
          return res();
        });
      }
      if (amountWasChanged) {
        this.orderS.updateProductAmount(newAmount, this.curOrderId, item.id).subscribe(data => {
          console.log("Amount of item with id="+item.id+" was changed");
          return res();
        })
      }
      if (itemExist && !amountWasChanged) {
        return res();
      }
    });
  }

  // items in this.items and this.tempItems goes from the max id to min id !!!
  // MANAGER CAN CHANGE ONLY AMOUNT and NUMBER OF ITEMS
  applyChanges() {
    this.asyncLoop({
      length: this.items.length,
      functionToLoop: (loop, i) => {
        this.checkItem(i).then(
          response => {
            loop();
          }
        )
      },
      callback: () => {
        console.log("All done!");
        this.showOrderDetails();
      }
    })
  }

  updateProductAmount(newAmount, itemId) {
    return this.orderS.updateProductAmount(newAmount, this.curOrderId, itemId);
  }

  deleteProduct(itemId) {
    return this.orderS.deleteProduct(this.curOrderId, itemId);
  }

  asyncLoop(o) {
    let i = -1;

    let loop = function() {
      i++;
      if(i==o.length) { o.callback(); return; }
      o.functionToLoop(loop, i);
    }
    loop();
  }

  clone(obj) {
    let copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj  instanceof Object) {
      copy  = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }
  }
}

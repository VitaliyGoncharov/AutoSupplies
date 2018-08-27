import { Component, OnInit } from '@angular/core';
import { Item } from '../../../../core/interfaces/item';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/interfaces/order';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  private total;
  private orderId;

  /**
   * Unmodified Array of order's items from database
   */
  private items: Array<{product: Item, amount: number}>;

  /**
   *  It is an array of items that were modified by user.
   *  He could change amount, delete item or add new item.
   *  => If user refreshes page or doesn't click save btn, this arr will be cleaned
   *  => If user presses save btn, this this.tempItems will be compared with this.items
   *     and if they are not equal then we will send request to server
   *     to update order items in database 
   */
  private tempItems: Array<{product: Item, amount: number}>;

  constructor(private route: ActivatedRoute, private orderS: OrderService) { }

  ngOnInit() {
    this.getProducts();
  }

  countTotal() {
    this.total = this.tempItems.reduce((total, product) => {
      return total + product.product.price * product.amount;
    },0);
  }

  getProducts() {
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderS.findById(this.orderId).subscribe((order: Order) => {
        this.tempItems = order.products;
        this.items = this.clone(this.tempItems);
        this.countTotal();
    });
  }

  minusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems)  {
      if(item.product.id == itemId && item.amount == 1) {
        console.log("The amount can't be less than 1. Use trash btn to remove product");
        return;
      }

      if(item.product.id == itemId && item.amount > 1) {
        item.amount = --item.amount;
      }
    }
    this.countTotal();
  }

  plusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems) {
      if (item.product.id == itemId) item.amount = ++item.amount;
    }
    this.countTotal();
  }

  removeItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    for (let item of this.tempItems) {
      if (item.product.id == itemId) {
        let index = this.tempItems.indexOf(item);
        if (index > -1) this.tempItems.splice(index, 1);
      }
    }
    this.countTotal();
  }

  changeAmount(event) {
    let input = event.target;
    let amount = input.value;

    if (event.keyCode != 8 && (event.keyCode < 48 || event.keyCode > 57)) return false;
    
    // if "Backspace" was pressed
    if (event.keyCode == 8) {
      console.log("Backspace was pressed!");
      amount = amount.substr(0,amount.length-1);
    }

    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("You pressed key of type number");
      amount = amount + event.key;
    }

    this.updatePrice(event, amount);
    this.countTotal();

    return false;
  }

  updatePrice(event, amount) {
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;

    // update amount in view 
    for (let item of this.tempItems) {
      if (item.product.id == itemId) {
        item.amount = amount;
      }
    }
  }

  /**
   * This method is called on blur event on input
   * for checking if inputed value is correct
   * 
   * For ex.: item amount shouldn't be null or equal to 0
   * 
   * @param event
   * @returns void
   */
  checkAmount(event) {
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;

    for (let item of this.tempItems) {
      //find item which amount we need to check
      if (item.product.id == itemId) {
        if (item.amount == 0 || item.amount == null) {
          item.amount = 1;
          this.countTotal();
        }
      }
    }
  }

  applyChanges(event) {
    this.asyncLoop({
      items: this.items,
      funcToLoop: (loop, i) => {
        this.checkItem(i).then(
          response => loop()
        )
      }
    }).then(response => this.checkNewItems());
  }

  async checkNewItems() {
    let itemsIds = this.items.map(x => {
      return x.product.id;
    });

    let newItems = this.tempItems.filter(x => {
      return itemsIds.indexOf(x.product.id) == -1;
    });

    for (let newItem of newItems) {
      await this.orderS.addProduct(this.orderId, newItem.product.id, newItem.amount).toPromise().then(res => {
        console.log("Item with id="+newItem.product.id+" was added");
      });
    }
    console.log("All items were proccessed");
  }

  checkItem(i) {
    return new Promise((res, rej) => {
      let initialItem = this.items[i];
      let productId = initialItem.product.id;
      let itemExist, amountWasChanged, newAmount;

      for (let tempItem of this.tempItems) {
        if (tempItem.product.id == productId) {
          itemExist = true;

          if (tempItem.amount !== initialItem.amount) {
            amountWasChanged = true;
            newAmount = tempItem.amount;
          }
        }
      }

      if (!itemExist) {
        this.orderS.deleteProduct(this.orderId, productId).subscribe(data => {
          console.log("Item with id="+productId+" was removed");
          return res();
        });
      }
      if (amountWasChanged) {
        this.orderS.updateProductAmount(newAmount, this.orderId, productId).subscribe(data => {
          console.log("Amount of item with id="+productId+" was changed");
          return res();
        });
      }
      if (itemExist && !amountWasChanged) {
        console.log("Item with id="+productId+" left untouched");
        return res();
      }
    });
  }

  asyncLoop(o) {
    return new Promise((res,rej) => {
      let i = -1;

      let loop = function() {
        i++;
        if (i == o.items.length) { return res() }
        o.funcToLoop(loop, i);
      }
      loop();
    });
  }

  clone(obj) {
    if (typeof obj != 'object' || obj == null) return obj;

    if (obj instanceof Array) {
      let copy = [];
      for (let attr in obj) {
        copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      let copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }
  }

  showAddItemPanel() {
    (<HTMLElement>document.querySelector("app-order-add-item")).style.left = "0";
  }
}

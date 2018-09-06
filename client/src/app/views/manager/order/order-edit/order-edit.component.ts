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

  private items: Array<{product: Item, amount: number}>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderS: OrderService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  countTotal() {
    this.total = this.items.reduce((total, product) => {
      return total + product.product.price * product.amount;
    },0);
  }

  getProducts() {
    this.orderId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.orderS.findById(this.orderId).subscribe((order: Order) => {
        this.items = order.products;
        this.countTotal();
    });
  }

  /**
   * Note async!!!
   */
  minusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    let item = this.items.find(item => item.product.id == itemId);

    if (item.amount == 1) {
      console.log("The amount can't be less than 1. Use trash btn to remove product");
      return;
    }

    if (item.amount > 1) {
      this.orderS.updateProductAmount(item.amount - 1, this.orderId, itemId).subscribe(data => {
        console.log("Amount of item with id="+itemId+" was changed");
        item.amount = --item.amount;
      }, null, () => {
        this.countTotal();
      });
    }
  }

  plusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    let item = this.items.find(item => item.product.id == itemId);

    this.orderS.updateProductAmount(item.amount + 1, this.orderId, itemId).subscribe(data => {
      console.log("Amount of item with id="+itemId+" was changed");
      item.amount = ++item.amount;
      console.log(this.items);
    }, null, () => {
      this.countTotal();
    });
    // item.amount = ++item.amount;
    // this.countTotal();
  }

  removeItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    let item = this.items.find(item => item.product.id == itemId);

    this.orderS.deleteProduct(this.orderId, itemId).subscribe(data => {
      console.log("Item with id="+itemId+" was removed");
      let index = this.items.indexOf(item);
      if (index > -1) this.items.splice(index, 1);
    }, null, () => {
      this.countTotal();
    });
  }

  changeAmount(event) {
    let input = event.target;
    let amount = input.value;
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;
    let item = this.items.find(item => item.product.id == itemId);

    if (event.keyCode != 8 && (event.keyCode < 48 || event.keyCode > 57)) return false;
    
    // if "Backspace" was pressed
    if (event.keyCode == 8) {
      console.log("Backspace was pressed!");
      amount = amount.substr(0,amount.length-1);
    }

    // if digit was pressed
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("You pressed key of type number");
      amount = amount + event.key;
    }

    this.orderS.updateProductAmount(amount, this.orderId, itemId).subscribe(data => {
      console.log("Amount of item with id="+itemId+" was changed");
      item.amount = amount;
      console.log(this.items);
    }, null, () => {
      this.countTotal();
    });

    return false;
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

    let item = this.items.find(item => item.product.id == itemId);

    if (item.amount == 0 || item.amount == null) {
      item.amount = 1;
      this.countTotal();
    }
  }

  saveChanges() {
    this.orderS.save(this.items).subscribe(data => {
      console.log(data);
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
    (<HTMLElement>document.querySelector("app-order-add-item")).style.display = "block";
    (<HTMLElement>document.querySelector("#order-editor")).style.display = "none";
  }
}

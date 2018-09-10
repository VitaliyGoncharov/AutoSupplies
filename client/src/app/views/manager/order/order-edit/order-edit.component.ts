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
      --item.amount;
      this.countTotal();
    }
  }

  plusItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    let item = this.items.find(item => item.product.id == itemId);

    ++item.amount;
    this.countTotal();
  }

  removeItem(event) {
    let target = event.target;
    let itemId = target.closest('.item').dataset.itemId;

    let item = this.items.find(item => item.product.id == itemId);

    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
    this.countTotal();
  }

  /**
   * It is fired on keyDown event.
   * The key hasn't been inserted to <input> yet.
   * We need to check if this key is "number" or "backspace",
   * if it's not a number or a backspace button then don't insert it to <input>
   * 
   * @param event 
   */
  filterAmount(event) {
    let input = event.target;
    let amount = input.value;
    let itemBlock = event.target.closest(".item");
    let itemId = itemBlock.dataset.itemId;
    let item = this.items.find(item => item.product.id == itemId);

    if (event.keyCode != 8 && (event.keyCode < 48 || event.keyCode > 57)) return false;
    
    // if "Backspace" was pressed
    if (event.keyCode == 8) {
      console.log("Backspace was pressed!");
      return true;
    }

    // if digit was pressed
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      console.log("You pressed key of type number");
      return true;
    }

    return false;
  }

  /**
   * It is fired on keyUp event.
   * We get here when digit has already been inserted to <input>!
   * We need to update amount in array (this.items) if it was changed
   * 
   * @param event 
   */
  changeAmount(event) {
    let input = event.target;
    let itemId = input.closest(".item").dataset.itemId;
    let item = this.items.find(item => item.product.id == itemId);

    if (item.amount == input.value) return false;

    item.amount = input.value;
    this.countTotal();
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
    let productsReq: Array<{productId: number, amount: number}> = [];
    this.items.map(item => {
      productsReq.push({
        productId: item.product.id,
        amount: item.amount
      });
    })
    this.orderS.save(productsReq, this.orderId).subscribe(data => {
      console.log("[OrderEditComponent] Order products were updated");
      this.router.navigate(['/manager/order/details', {id: this.orderId}]);
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

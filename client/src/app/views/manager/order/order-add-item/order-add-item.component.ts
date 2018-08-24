import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-add-item',
  templateUrl: './order-add-item.component.html',
  styleUrls: ['./order-add-item.component.scss']
})
export class OrderAddItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("ADD-ITEM");
  }

}

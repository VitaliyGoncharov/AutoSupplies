import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../../../core/interfaces/item';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ItemsService } from '../../../../core/services/items.service';

@Component({
  selector: 'app-order-add-item',
  templateUrl: './order-add-item.component.html',
  styleUrls: ['./order-add-item.component.scss']
})
export class OrderAddItemComponent implements OnInit {

  @Input() tempItems: Array<{product: Item, amount: number}>;

  @Output() addedItem = new EventEmitter<string>();

  results: Array<Item>;
  searchField: FormControl = new FormControl();

  constructor(private itemS: ItemsService) { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(val => {
      if (val != null) {
        this.itemS.findByKeyword(val).subscribe((data: Array<Item>) => {
          this.results = data;
        })
      }
    });
  }

  goBack() {
    (<HTMLElement>document.querySelector("app-order-add-item")).style.display = "none";
    (<HTMLElement>document.querySelector("#order-editor")).style.display = "block";
  }

  addItem(item: Item) {
    this.tempItems.push({product: item, amount: 1});
    this.addedItem.emit('added');
    this.goBack();
  }
}

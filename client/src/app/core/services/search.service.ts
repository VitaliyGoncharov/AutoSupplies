import { Injectable, EventEmitter } from "@angular/core";
import { Item } from "../interfaces/item";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    searchResults = new BehaviorSubject<Array<Item>>(null);
}
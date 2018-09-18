import { Component, Input } from "@angular/core";
import { Catalog } from "../../../core/interfaces/catalog";

@Component({
    selector: 'main-menu-mobile',
    templateUrl: './_menu-mobile.component.html',
    styleUrls: ['./_menu-mobile.component.scss']
})
export class MenuMobileComponent {
    @Input() catalogs: Array<Catalog>;
}
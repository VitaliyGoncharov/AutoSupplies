import { Component, Input } from "@angular/core";
import { Catalog } from "../../../core/interfaces/catalog";

@Component({
    selector: 'main-menu-desktop',
    templateUrl: './_menu-desktop.component.html',
    styleUrls: ['./_menu-desktop.component.scss']
})
export class MenuDesktopComponent {
    @Input() catalogs: Array<Catalog>;
}
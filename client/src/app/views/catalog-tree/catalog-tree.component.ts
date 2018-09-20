import { Component, Input } from "@angular/core";
import { Catalog } from "../../core/interfaces/catalog";

@Component({
    selector: 'catalog-tree',
    templateUrl: './catalog-tree.component.html',
    styleUrls: ['./catalog-tree.component.scss']
})
export class CatalogTreeComponent {
    @Input() catalogs: Array<Catalog>;
}
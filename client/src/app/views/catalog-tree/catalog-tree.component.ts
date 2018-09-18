import { Component, Input } from "@angular/core";

@Component({
    selector: 'catalog-tree',
    templateUrl: './catalog-tree.component.html',
    styleUrls: ['./catalog-tree.component.scss']
})
export class CatalogTreeComponent {
    @Input() catalogs;
}
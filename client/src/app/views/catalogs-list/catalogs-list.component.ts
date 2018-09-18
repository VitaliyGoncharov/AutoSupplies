import { Component, OnInit, Input } from "@angular/core";
import { Catalog } from "../../core/interfaces/catalog";
import { CatalogService } from "../../core/services/catalog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'catalogs-list',
    templateUrl: './catalogs-list.component.html',
    styleUrls: ['./catalogs-list.component.scss']
})
export class CatalogsListComponent implements OnInit {

    catalogs;

    constructor(
        private catalogS: CatalogService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        let rootCatalog = this.route.snapshot.paramMap.get('catalog');
        console.log("[CatalogsListComponent]");
        this.catalogs = JSON.parse('{"1":{"id":1,"parent":0,"title":"spare-parts","childs":{"2":{"id":2,"parent":1,"title":"engine","childs":{"3":{"id":3,"parent":2,"title":"collector","childs":null}}}}}}');
        this.catalogs = this.convertChildsToArray(this.catalogs);
    }

    /**
     * catalog {id: {id,parentId,title,childs: {} }}
     * 
     * @param catalogs 
     */
    convertChildsToArray(catalogs): Array<Catalog> {
        let result = [];
        let keys = Object.keys(catalogs);
        if (!keys) return result;

        for (let key of keys) {
            if (catalogs[key].childs != null) {
                catalogs[key].childs = this.convertChildsToArray(catalogs[key].childs);
            }
            result.push(catalogs[key]);
        }
        return result;
    }
}
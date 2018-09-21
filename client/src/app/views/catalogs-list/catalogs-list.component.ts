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

    catalogs: Array<Catalog>;
    curCatalog: Catalog;
    prevCatalog: Catalog;
    backLink: string;

    constructor(
        private catalogS: CatalogService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.url.subscribe(data => {
            let rootCatalog = this.route.snapshot.paramMap.get('catalog');
            console.log("[CatalogsListComponent]");

            this.catalogS.getAllFromRoot(rootCatalog).subscribe(data => {
                
                let catsWithRoot = this.catalogS.convertChildsToArray(data);
                this.catalogs = catsWithRoot[0].childs;
                this.curCatalog = catsWithRoot[0];

                if (this.curCatalog.parentId != 0) {
                    this.catalogS.getCatalog(this.curCatalog.parentId).subscribe(data => {
                        this.prevCatalog = data;
                        this.backLink = "/catalog/list/" + this.prevCatalog.pathName;
                    });
                } else {
                    this.backLink = "/";
                }
            });
        });        
    }
}
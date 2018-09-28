import { Component } from '@angular/core';
import { ItemsService } from '../../core/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { range } from 'rxjs';

@Component({
    selector: 'items-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

    backLink: string;
    nextLink: string;
    curPage: number;
    catalogTitle: string;
    
    totalPages: number;
    pages: number[];
    
    constructor(
        private itemS: ItemsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.params.subscribe(data => {
            this.resetVars();
            this.preparePaginationLinks();
        });
    }

    preparePaginationLinks() {
        this.catalogTitle = this.route.snapshot.paramMap.get('title');
        this.curPage = Number.parseInt(this.route.snapshot.paramMap.get('page'));
        let itemsPerPage = 3;

        this.itemS.getAmountByCatalogName(this.catalogTitle).subscribe(totalItems => {
            this.totalPages = Math.ceil(totalItems / itemsPerPage);

            if (this.curPage < 1) {
                this.curPage = 1;
            } else if(this.curPage > this.totalPages) {
                this.curPage = totalItems;
            }

            if (this.curPage > 1) {
                this.backLink = "/catalog/" + this.catalogTitle + "/" + (this.curPage - 1);
            }
            
            if (this.curPage < this.totalPages) {
                this.nextLink = "/catalog/" + this.catalogTitle + "/" + (this.curPage + 1);
            }

            for (let page = 1; page <= this.totalPages; page++) {
                if (page == 1 || page == this.totalPages ||
                    (page >= (this.curPage - 2) && page <= (this.curPage + 2))
                ) {
                    this.pages.push(page);
                }
                
            }
        });
    }

    resetVars() {
        this.backLink = null;
        this.nextLink = null;
        this.curPage = null;
        this.catalogTitle = null;
        
        this.totalPages = null;
        this.pages = [];
    }
}
import { Component } from '@angular/core';
import { ItemsService } from '../../core/services/items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'items-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
    
    constructor(
        private itemS: ItemsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        let catalogTitle = this.route.snapshot.paramMap.get('title');
        let curPage = Number.parseInt(this.route.snapshot.paramMap.get('page'));

        this.itemS.getAmountByCatalogName(catalogTitle).subscribe(totalItems => {
            if (curPage < 1) {
                curPage = 1;
            } else if(curPage > totalItems) {
                curPage = totalItems;
            }
        });
    }
}
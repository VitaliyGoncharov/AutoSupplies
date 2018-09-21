import { NgModule } from "@angular/core";
import { CatalogTreeComponent } from "./catalog-tree/catalog-tree.component";
import { CatalogsListComponent } from "./catalogs-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        CatalogTreeComponent,
        CatalogsListComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CatalogTreeComponent,
        CatalogsListComponent
    ]
})
export class CatalogListModule { }
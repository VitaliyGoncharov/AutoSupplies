import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "./_sidebar/_sidebar.component";
import { CatalogService } from "../core/services/catalog.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'main-root',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}
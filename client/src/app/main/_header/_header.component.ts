import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SidebarComponent } from "../_sidebar/_sidebar.component";
import { TokenService } from "../../core/services/token.service";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ItemsService } from "../../core/services/items.service";
import { SearchService } from "../../core/services/search.service";
import { Catalog } from "../../core/interfaces/catalog";
import { CatalogService } from "../../core/services/catalog.service";

@Component({
    selector: 'main-header',
    templateUrl: './_header.component.html',
    styleUrls: ['./_header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
    isLoggedIn: boolean;
    email: string;
    catalogs: Array<Catalog>;

    search: FormControl = new FormControl;
    // results: Array<string>;

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private router: Router,
        private catalogS: CatalogService,
        private cdRef: ChangeDetectorRef,
        private itemS: ItemsService,
        private searchS: SearchService
    ) { }

    ngOnInit() {
        this.catalogs = this.catalogS.catalogs;

        if (this.authS.isLoggedIn() && this.tokenS.isValid()) {
            this.authS.loggedInSubj.next(true);
        }
        this.authS.loggedInSubj.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            if (isLoggedIn)
                this.email = this.tokenS.getSubject();
        });

        this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(val => {
            if (val != null) {
                this.itemS.findByKeyword(val).subscribe(data => {
                    this.searchS.searchResults.next(data);
                    if (this.router.url !== '/search') {
                        console.log("[HeaderComponent] Navigate to '/search'");
                        this.router.navigate(['/search']);
                    }
                },error => {
                    if (this.router.url !== '/search') {
                        console.log("[HeaderComponent] Navigate to '/search'");
                        this.router.navigate(['/search']);
                    }
                });
            }
        })
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
    
    logout(event) {
        event.preventDefault();
        this.authS.logout();
    }
}
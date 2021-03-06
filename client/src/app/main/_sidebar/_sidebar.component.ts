import { Component, Input, HostBinding, OnInit, DoCheck, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "../../core/services/token.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CatalogService } from "../../core/services/catalog.service";
import { CatalogRes } from "../../core/interfaces/res/catalog";
import { Catalog } from "../../core/interfaces/catalog";

@Component({
    selector: 'main-sidebar',
    templateUrl: './_sidebar.component.html',
    styleUrls: ['./_sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewChecked {
    
    isLoggedIn: boolean;
    email: string;
    catalogs: Array<Catalog>;

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private router: Router,
        private cdRef: ChangeDetectorRef,
        private route: ActivatedRoute,
        private catalogS: CatalogService
    ) { }

    ngOnInit() {
        this.catalogs = this.catalogS.catalogs;

        if (this.authS.isLoggedIn() && this.tokenS.isValid()) {
            this.authS.loggedInSubj.next(true);
        }
        this.authS.loggedInSubj.subscribe(value => {
            this.isLoggedIn = value;
            if (this.isLoggedIn)
                this.email = this.tokenS.getSubject();
        });
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    logout(event) {
        event.preventDefault();
        this.authS.logout();
    }

    hasAuthorities(...authorities) {
        if (!this.authS.isLoggedIn() || !this.tokenS.isValid()) {
            this.authS.loggedInSubj.next(false);
            return false;
        }
        return this.authS.hasAuthorities(authorities);
    }
}
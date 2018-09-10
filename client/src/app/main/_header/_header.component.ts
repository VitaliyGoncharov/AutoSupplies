import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SidebarComponent } from "../_sidebar/_sidebar.component";
import { TokenService } from "../../core/services/token.service";

@Component({
    selector: 'main-header',
    templateUrl: './_header.component.html',
    styleUrls: ['./_header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
    isLoggedIn: boolean;
    email: string;

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private router: Router,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        if (this.authS.isLoggedIn() && this.tokenS.isValid()) {
            this.authS.loggedInSubj.next(true);
        }
        this.authS.loggedInSubj.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            if (isLoggedIn)
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
}
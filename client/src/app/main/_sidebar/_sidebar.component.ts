import { Component, Input, HostBinding, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "../../core/services/token.service";
import { Router } from "@angular/router";

@Component({
    selector: 'main-sidebar',
    templateUrl: './_sidebar.component.html',
    styleUrls: ['./_sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    email: string;
    isLoggedIn: boolean;

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authS.loggedInSubj.subscribe(value => {
            this.isLoggedIn = value;
            if (this.isLoggedIn)
                this.email = this.tokenS.getSubject();
        });
    }

    logout(event) {
        event.preventDefault();
        this.authS.logout();
        this.isLoggedIn = false;
        this.router.navigate(['/']);
    }

    hasAuthorities(...authorities) {
        if (!this.isLoggedIn)
            return false;
        return this.authS.hasAuthorities(authorities);
    }
}
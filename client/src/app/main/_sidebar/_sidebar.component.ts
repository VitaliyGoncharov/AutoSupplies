import { Component, Input, HostBinding } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenService } from "../../core/services/token.service";

@Component({
    selector: 'main-sidebar',
    templateUrl: './_sidebar.component.html',
    styleUrls: ['./_sidebar.component.scss']
})
export class SidebarComponent {

    email: string;
    isLoggedIn: boolean;

    constructor(private authS: AuthService, private tokenS: TokenService) {
        this.authS.loggedInSubj.subscribe(value => {
            this.isLoggedIn = value;
            if (this.isLoggedIn)
                this.email = this.tokenS.getEmail();
        });
    }

    logout(event) {
        event.preventDefault();
        this.authS.logout();
        this.isLoggedIn = false;
    }

    hasAuthorities(...authorities) {
        if (!this.isLoggedIn)
            return false;
        return this.authS.hasAuthorities(authorities);
    }
}
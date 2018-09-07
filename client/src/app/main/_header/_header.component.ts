import { Component, OnInit, Input } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { SidebarComponent } from "../_sidebar/_sidebar.component";
import { TokenService } from "../../core/services/token.service";

@Component({
    selector: 'main-header',
    templateUrl: './_header.component.html',
    styleUrls: ['./_header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean;
    email: string;

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.authS.loggedInSubj.subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            if (isLoggedIn)
                this.email = this.tokenS.getSubject();
        });
    }
    
    logout(event) {
        event.preventDefault();
        this.authS.logout();
        this.isLoggedIn = false;
    }
}
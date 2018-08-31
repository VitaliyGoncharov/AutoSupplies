import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {

    can: boolean = false;

    constructor(private _router: Router, private authS: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot) {

        /**
         * If user is not logged in, then redirect to home page
         */
        if (!this.authS.isLoggedIn()) {
            console.log("You're not logged in");
            this._router.navigate(['/']);
            return false;
        }
        /**
         * If user doesn't have authorities, then redirect to home page
         */
        if (!this.authS.hasAuthorities(['MANAGER','ADMIN'])) {
            console.log("Don't have authorities");
            this._router.navigate(['/']);
            return false;
        }

        /**
         * If requested url is nor /manager/orders and has id
         * then allow access to the page
         */
        if (route.url[0].path != "orders" && route.paramMap.get('id')) {
            return true;
        }

        this._router.navigate(['/']);
        return false;
    }
}
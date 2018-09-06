import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, CanActivateChild } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivateChild {

    can: boolean = false;

    constructor(private _router: Router, private authS: AuthService) { }

    canActivateChild(route: ActivatedRouteSnapshot) {
        console.log(":: OrderGuard ::");

        /**
         * If user doesn't have authorities, then redirect to home page
         */
        if (!this.authS.hasAuthorities('MANAGER','ADMIN')) {
            console.log("Don't have authorities");
            this._router.navigate(['/']);
            return false;
        }

        /**
         * If requested url is not /manager/orders and has id
         * OR requested url is /manager/orders
         * then allow access to the page
         */
        if (route.url[0].path != "orders" && route.paramMap.get('id') || route.url[0].path == "orders") {
            return true;
        }

        
        this._router.navigate(['/']);
        return false;
    }
}
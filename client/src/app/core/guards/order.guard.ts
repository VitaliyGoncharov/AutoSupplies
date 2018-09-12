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
        console.log("[OrderGuard]");

        /**
         * Give access only if user has one of the following authorities
         */
        if (this.authS.hasAuthorities(['MANAGER','ADMIN'])) {
            return true;
        }

        console.log("[OrderGuard] You don't have required authorities");
        this._router.navigate(['/']);
        return false;
    }
}
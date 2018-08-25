import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {

    can: boolean = false;

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (!route.paramMap.get('id')) {
            this._router.navigate(['/']);
        }
        return true;
    }
}
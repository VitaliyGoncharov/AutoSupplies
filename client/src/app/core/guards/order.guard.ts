import { Injectable } from "@angular/core";
import { CanLoad, Route, CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class OrderGuard implements CanActivate {

    can: boolean = false;

    constructor(private _router: Router) { }

    // canLoad(route: Route): boolean {
    //     return false;
    // }

    canActivate() {
        this._router.navigate(['/']);
        return false;
    }
}
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { of, Observable } from "rxjs";

@Injectable()
export class LoggedInResolver implements Resolve<any> {

    constructor(private authS: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // this.authS.loggedInSubj.next(true);

        // return of("FROMRES");
        return new Promise( (res, rej) => {
            setTimeout( () => {
              res(true);
            }, 6000);
          });

        // if (this.authS.isLoggedIn) return Promise.resolve(true);
        // if (!this.authS.isLoggedIn) return Promise.resolve(true);

        // return this.authS.tryAutoRefresh().then(
        //     success => {
        //         this.authS.loggedInSubj.next(true);
        //         return true;
        //     },
        //     error => {
        //         this.authS.loggedInSubj.next(false);
        //         return false;
        //     }
        // )
    }
}
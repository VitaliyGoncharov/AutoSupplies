import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { reject } from "q";

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userS: UserService, private authS: AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        console.log("[UserResolver]");
        if (!this.authS.isLoggedIn()) return Promise.resolve(null);
        return new Promise( (res, rej) => {
            this.userS.getUserInfo().subscribe(data => res(data), error => rej());
        });
    }
}
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userS: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
        return new Promise( (res, rej) => {
            this.userS.getUserInfo().subscribe(data => res(data), error => rej());
        });
    }
}
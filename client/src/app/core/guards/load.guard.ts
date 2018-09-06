import { Injectable } from "@angular/core";
import { CanActivateChild } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class LoadGuard implements CanActivateChild {

    constructor(private authS: AuthService) { }

    /**
     * This method will always return Promise<true>
     */
    canActivateChild(): Promise<boolean> {
        let access_token = localStorage.getItem('access_token');
        let refresh_token = localStorage.getItem('refresh_token');

        if (!access_token || !refresh_token)
            return Promise.resolve(true);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(access_token);
        let curTime = Math.floor(Date.now() / 1000);
    
        if (!decodedToken) return Promise.resolve(true);
        if (!decodedToken.sub || !decodedToken.exp 
                || !decodedToken.authorities) return Promise.resolve(true);
        
        if (decodedToken.exp > curTime) {
            this.authS.loggedInSubj.next(true);
            return Promise.resolve(true);
        }
        
        if (decodedToken.exp < curTime) {
            return new Promise( (res,rej) => {
                this.authS.tryAutoRefresh().then(
                    success => {
                        console.log("Success");
                        this.authS.loggedInSubj.next(true)
                        return res(true);
                    },
                    error => {
                        console.log("Fail");
                        this.authS.loggedInSubj.next(false);
                        return res(true);
                    }
                );
            });
        }
    }
}
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../interfaces/access-token';
import { AuthToken } from '../interfaces/auth-token';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private jwtHelper: JwtHelperService;

    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    getSubject() {
        let decodedToken: AccessToken = this.decodeToken();
        return decodedToken.sub;
    }

    getExp() {
        let decodedToken: AccessToken = this.decodeToken();
        return decodedToken.exp;
    }

    getAuthorities() {
        let decodedToken: AccessToken = this.decodeToken();
        return decodedToken.authorities;
    }

    decodeToken() {
        return this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
    }

    isExpired() {
        let curTime = Math.floor(new Date().getTime() / 1000);
        let tokenExpTime = this.getExp();
        if (curTime > tokenExpTime) return true;
        else return false;
    }

    exist() {
        let accessToken = localStorage.getItem('access_token');
        let refreshToken = localStorage.getItem('refresh_token');

        if (accessToken == '' || accessToken == null || refreshToken == '' || refreshToken == null)
            return false;
        else return true;
    }

    isValid() {
        let decodedToken: AccessToken;
        try {
            decodedToken = this.decodeToken();
        } catch (err) {
            console.log("Can't decode token!")
            return false;
        }
        return true;
    }
}
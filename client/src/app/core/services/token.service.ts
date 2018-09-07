import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../interfaces/access-token';


@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private jwtHelper: JwtHelperService;

    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    getSubject() {
        let decodedToken: AccessToken = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
        return decodedToken.sub;
    }

    getExp() {
        let decodedToken: AccessToken = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
        return decodedToken.exp;
    }

    getAuthorities() {
        let decodedToken: AccessToken = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
        return decodedToken.authorities;
    }
}
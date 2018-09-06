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

    getEmail() {
        let decodedToken: AccessToken = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
        return decodedToken.sub;
    }
}
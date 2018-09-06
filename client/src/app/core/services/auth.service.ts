import { Injectable, Output, EventEmitter, NgZone } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken } from '../interfaces/auth-token';

interface Tokens {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInSubj = new BehaviorSubject<boolean>(false);
  
  private GET_TOKENS = "/api/token";
  private REFRESH_TOKENS = "/api/token";

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient, private router: Router) {
  }
  
  setLoggedIn(value: boolean) {
    this.loggedInSubj.next(value);
  }

  isLoggedIn(): boolean {
    let access_token: string = localStorage.getItem('access_token');
    let refresh_token: string = localStorage.getItem('refresh_token');

    if (!access_token || !refresh_token)
      return false;

    return true;
    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(access_token);
    // let curTime = Math.floor(Date.now() / 1000);

    // if (!decodedToken) return false;
    // if (!decodedToken.sub || !decodedToken.exp || !decodedToken.authorities) return false;

    // if (decodedToken.exp > curTime) {
    //   return true;
    // }

    // if (decodedToken.exp < curTime) {
    //   return false;
    // }

    // return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  login(email, password) {
    let body = {
      "grant_type": "password",
      "email": email.toString(),
      "password": password.toString()
    }
    let options = { headers: this.headers };
    return this.http.post(this.GET_TOKENS, body, options);
  }
  
  saveTokens(access_token, refresh_token) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }

  tryAutoRefresh() {
    return new Promise( (res, rej) => {
      this.refreshTokens().subscribe((data: AuthToken) => {
        this.saveTokens(data.access_token, data.refresh_token);
        console.log("[200] Auto-refresh tokens");
        return res();
      },
      error => {
        this.logout();
        console.log("[500] Auto-refreshed tokens");
        console.log(error);
        return rej();
      });
    })
  }

  refreshTokens() {
    let refresh_token = localStorage.getItem('refresh_token');
    let body = {
      "grant_type": "refresh_token",
      "refresh_token": refresh_token.toString()
    }
    let options = { headers: this.headers };
    return this.http.post(this.REFRESH_TOKENS, body, options);
  }

  hasAuthorities(...authorities) {
    let hasAuthorities = false;
    authorities = authorities.map(authority => {
      return 'ROLE_' + authority;
    });

    let access_token = localStorage.getItem('access_token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(access_token);
    let token_authorities: Array<string> = decodedToken.authorities;

    for (let tokenAuthority of token_authorities) {
      for (let authority of authorities) {
        if (tokenAuthority == authority) {
          hasAuthorities = true;
          break;
        }
      }
    }
    return hasAuthorities;
  }
}

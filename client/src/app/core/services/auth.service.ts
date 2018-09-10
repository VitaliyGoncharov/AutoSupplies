import { Injectable, Output, EventEmitter, NgZone } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthToken } from '../interfaces/auth-token';
import { TokenService } from './token.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenS: TokenService
  ) { }
  
  setLoggedIn(value: boolean) {
    this.loggedInSubj.next(value);
  }

  isLoggedIn(): boolean {
    if (!this.getAccessToken() || !this.getRefreshToken())
      return false;

    return true;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedInSubj.next(false);
    return this.router.navigate(['/']);
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

  autoRefreshTokens(): Promise<void> {
    if (!this.tokenS.exist() || !this.tokenS.isValid())
      return Promise.resolve();

    if (!this.tokenS.isExpired()) {
      this.loggedInSubj.next(true);
      return Promise.resolve();
    }

    if (this.tokenS.isExpired()) {
      console.log("Try to refresh token");
      return new Promise( (res, rej) => {
        setTimeout(() => {
          console.log("In auth service");
          res();
        }, 4000);
        // this.refreshTokens().subscribe(data => {
        //   console.log("[200] Auto-refreshed tokens");
        //   this.saveTokens(data.access_token, data.refresh_token);
        //   // this.loggedInSubj.next(true);
        //   res();
        // },
        // error => {
        //   console.log("[500] Auto-refreshed tokens");
        //   // console.log(error);
        //   // this.logout();
        //   // this.loggedInSubj.next(false);
        //   rej();
        // }, () => {
        //   console.log("We complete!");
        // });

        // this.refreshTokens().subscribe(data => {
        //   console.log(data);
        //   this.saveTokens(data.access_token, data.refresh_token);
        //   this.loggedInSubj.next(true);
        //   res();
        // }, error => {
        //   console.log(error)
        //   this.loggedInSubj.next(false);
        //   res();
        // }, () => {
        //   console.log("FINISHED")
        // });
      });
    }
  }

  refreshTokens() {
    let refresh_token = localStorage.getItem('refresh_token');
    let body = {
      "grant_type": "refresh_token",
      "refresh_token": refresh_token.toString()
    }
    let options = { headers: this.headers };
    return this.http.post<AuthToken>(this.REFRESH_TOKENS, body, options);
  }

  hasAuthorities(authorities: Array<string>) {
    let hasAuthorities = false;

    authorities = authorities.map(authority => {
      return 'ROLE_' + authority;
    });

    let tokenAuthorities: Array<string> = this.tokenS.getAuthorities();

    for (let tokenAuthority of tokenAuthorities) {
      let authority = authorities.find(authority => authority == tokenAuthority);
      if (authority) {
        hasAuthorities = true;
        break;
      }
    }
    return hasAuthorities;
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}

import { Injectable, Output, EventEmitter, NgZone } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

interface Tokens {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInSubj = new BehaviorSubject<boolean>(false);
  
  private LOGIN = "/api/token";

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private http: HttpClient, private router: Router) { }
  
  setLoggedIn(value: boolean) {
    let status: string = String(value);
    localStorage.setItem('loggedIn', status);
    this.loggedInSubj.next(value);
  }

  isLoggedIn() {
    let access_token: string = localStorage.getItem('access_token');

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(access_token);
    let curTime = Math.floor(Date.now() / 1000);

    if (decodedToken && decodedToken.exp > curTime) {
      this.loggedInSubj.next(true);
      return true;
    }

    this.loggedInSubj.next(false);
    this.logout();
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  login(email, password) {
    let body = {
      "grant_type": "password",
      "email": email.toString(),
      "password": password.toString()
    }
    let options = { headers: this.headers };
    return this.http.post(this.LOGIN, body, options);
  }
  
  saveTokens(access_token) {
    localStorage.setItem('access_token', access_token);
  }

  hasAuthorities(authorities: Array<string>) {
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
        console.log(tokenAuthority + " ---- " + authority);
        if (tokenAuthority == authority) {
          hasAuthorities = true;
          break;
        }
      }
    }
    return hasAuthorities;
  }
}

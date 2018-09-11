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
    if ( (!this.tokenS.getAccessToken() || !this.tokenS.getRefreshToken())
            || !this.tokenS.isValid() )
      return false;

    return true;
  }

  logout() {
    this.tokenS.removeTokens();
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

  refreshTokens() {
    let refresh_token = localStorage.getItem('refresh_token');
    let body = {
      "grant_type": "refresh_token",
      "refresh_token": refresh_token.toString()
    }
    let options = { headers: this.headers };
    return this.http.post<AuthToken>(this.REFRESH_TOKENS, body, options);
  }

  /**
   * Check if user has at least one of the required authorities
   * 
   * @param authorities 
   */
  hasAuthorities(authorities: Array<string>) {
    let hasAuthority = false;

    authorities = authorities.map(authority => {
      return 'ROLE_' + authority;
    });

    let tokenAuthorities: Array<string> = this.tokenS.getAuthorities();

    for (let tokenAuthority of tokenAuthorities) {
      let authority = authorities.find(authority => authority == tokenAuthority);
      if (authority) {
        hasAuthority = true;
        break;
      }
    }
    return hasAuthority;
  }
}

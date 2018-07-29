import { Injectable, Output, EventEmitter, NgZone } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';

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
  
  private _url: string = '/api/token';

  constructor(private http: HttpClient, private router: Router) { }
  
  setLoggedIn(value: boolean) {
    let status: string = String(value);
    localStorage.setItem('loggedIn', status);
    this.loggedInSubj.next(value);
  }

  isLoggedIn() {
    let status: boolean = JSON.parse(localStorage.getItem('loggedIn'));
    this.loggedInSubj.next(status);
    return status;
  }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('access_token');
  }
  
  getTokens(email, password) {
    console.log("Navigating ...");
    if(email == 'admin@mail.ru' && password == '1111') {
      this.setLoggedIn(true);
      this.saveTokens("my_token_secret");
      this.router.navigate(['']);
    } else {
      window.alert("Wrong credentials -- (");
    }
    
    
//    const postedData = { username: email, password: password, grant_type: "password" };
//    return this.http.post<Tokens>(this._url, postedData, httpOptions).subscribe(data => {
//      console.log("Sending ...");
//      console.log(data);
//      
//      if (data.access_token) {
//        console.log("Navigating ...");
//        this.setLoggedIn(true);
//        this.saveTokens(data.access_token);
//        this.router.navigate(['/']);
//      } else {
//        window.alert('Auth error!!! :(((');
//      }
//    });
  }
  
  saveTokens(access_token) {
    localStorage.setItem('access_token', access_token);
  }
}

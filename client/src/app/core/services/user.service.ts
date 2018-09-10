import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../interfaces/user';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private GET_USER_INFO: string = "/api/user";

  constructor(private http: HttpClient) { }

  addAuthHeader(headers: HttpHeaders) {
    return headers.append("Authorization", localStorage.getItem('access_token'));
  }

  getUserInfo(): Observable<User> {
    let options = { headers: this.addAuthHeader(this.headers) };
    return this.http.get<User>(this.GET_USER_INFO, options);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url: string = "/api/user/";
  private profileInfo_url: string = "/assets/userInfo.json";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa('bill:abc123')
    });
    return this.http.get<any>(this._url, {headers: headers});
  }

  getUserInfo() {
    return this.http.get(this.profileInfo_url);
  }
}

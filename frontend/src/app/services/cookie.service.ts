import { Injectable } from "../../../node_modules/@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    constructor () {}

    getCookie(cname: string): string {
        let name = cname + "=";
        let cookies = decodeURIComponent(document.cookie).split(";");

        for (let cookie of cookies) {
            while(cookie.charAt(0) == ' ') {
                cookie = cookie.substr(1);
            }

            if (cookie.indexOf(name) == 0) {
                return cookie.substr(name.length, cookie.length);
            }
        }
        return "";
    }

    setCookie(cname, cvalue, exdays?): void {
        let cookie = cname + "=" + cvalue + ";";
        if (exdays) {
            let date = new Date();
            date.setTime(date.getTime() + (exdays*24*60*60*1000));
            let expires = " expires=" + date.toUTCString();
            cookie += expires;
        }
        document.cookie = cookie;
    }
}
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError, switchMap, filter, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { AuthToken } from "../interfaces/auth-token";
import { TokenService } from "../services/token.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private GUARDED_ROUTES = [
        'manager',
        'user'
    ];

    constructor(
        private authS: AuthService,
        private tokenS: TokenService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if (req.url.includes("manager") || req.url == "/api/user") {
        //     console.log("Year, includes");
        //     console.log(req.url);
        //     const clonedReq = req.clone({
        //         headers: req.headers.append('MY-TEST','azazalalka')
        //     });
        //     return next.handle(clonedReq);        
        // }

        return next.handle(req).pipe(
            catchError(error => {
                

                if (req.url.includes("token")) {
                    console.log("[AuthInterceptor] RefreshToken is not valid");
                    return throwError(error);
                }

                let isGuardedRoute = this.GUARDED_ROUTES.filter(route => req.url.includes(route));
                if (isGuardedRoute.length == 0) return throwError(error);

                if (this.authS.getAccessToken() == null || this.authS.getRefreshToken() == null) {
                    console.log("[AuthInterceptor] No tokens in localStorage (you removed them manually OR guard doesn't deny access)");
                    this.router.navigate(['/login']);
                    return throwError(error);
                }

                if (this.refreshTokenInProgress) {
                    console.log("[AuthInterceptor] Wait for getting refreshed token pair");
                    return this.refreshTokenSubject.pipe(
                        filter(value => value != null),
                        take(1),
                        switchMap(val => {
                            return next.handle(this.authToken(req));
                        })
                    )
                } else {
                    this.refreshTokenInProgress = true;

                    this.refreshTokenSubject.next(null);

                    return this.authS.refreshTokens().pipe(
                        switchMap(tokens => {
                            console.log("[AuthInterceptor] Received new token pair");
                            this.refreshTokenInProgress = false;
                            this.refreshTokenSubject.next(tokens);

                            // save tokens in localStorage
                            this.authS.saveTokens(tokens.access_token, tokens.refresh_token);

                            return next.handle(this.authToken(req));
                        }),
                        catchError(err => {
                            console.log("[AuthInterceptor] Refreshing tokens fails");
                            this.refreshTokenInProgress = false;
                            this.authS.logout();
                            this.router.navigate(['/login']);
                            return throwError(error);
                        })
                    )
                }
            })
        );
        
    }

    authToken(request) {
        const accessToken = this.authS.getAccessToken();

        if (!accessToken) {
            return request;
        }

        return request.clone({
            setHeaders: {
                Authorization: this.authS.getAccessToken()
            }
        })
    }
}
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkIfLoggedIn(next, state);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIfLoggedIn(next, state);
  }

  checkIfLoggedIn(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(":: AuthGuard ::");
    
    if (this.auth.loggedInSubj.value) {
      return true;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

import { AuthService } from './core/services/auth.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  email: string;
  width: number = 0;
  
  isLoggedIn: boolean;
  
  constructor(private authS: AuthService, private router: Router) {
    
  }
  
  ngOnInit() {
  }

  ngAfterContentInit() {
    // check if user is logged in and update [loggedIn: BehaviorSubject]
    this.authS.isLoggedIn();
        
    this.authS.loggedInSubj.subscribe(isLoggedIn => {
      if (this.isLoggedIn != isLoggedIn) {
        this.isLoggedIn = isLoggedIn;

        let helper = new JwtHelperService();
        if (localStorage.getItem('access_token')) {
          let decodedToken = helper.decodeToken(localStorage.getItem('access_token'));
          this.email = decodedToken.sub;
        }
      }
    });
  }
  
  logout(event) {
    event.preventDefault();
    
    this.authS.logout();
    this.isLoggedIn = this.authS.isLoggedIn();
  }

  // всего три строчки js кода
  toggleSideMenu() {
    document.querySelector('.toggleMenu').classList.toggle('translatedX');
    document.querySelector('.sideMenu').classList.toggle('d-flex');

    document.querySelector('.toggleMenu').classList.toggle('toggleMenu--active');
  }

  toggleDropDown() {
    document.querySelector('.main-dropdown-content').classList.toggle('d-block');
  }

  hasAuthorities(authorities: Array<string>) {
    if (!this.authS.isLoggedIn()) {
      return false;
    }
    return this.authS.hasAuthorities(authorities);
  }
}

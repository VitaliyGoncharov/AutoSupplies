import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  private isLoggedIn: boolean;
  
  constructor(private auth: AuthService, private router: Router) {}
  
  ngOnInit() {
    // check if user is logged in and update [loggedIn: BehaviorSubject]
    this.auth.isLoggedIn();
    
    this.auth.loggedInSubj.subscribe(isLoggedIn => { 
      this.isLoggedIn = isLoggedIn;
    });
  }
  
  logout(event) {
    event.preventDefault();
    
    this.auth.logout();
    this.isLoggedIn = this.auth.isLoggedIn();
  }
}

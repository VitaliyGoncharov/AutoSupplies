import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthToken } from '../../../core/interfaces/auth-token';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authS: AuthService,
    private tokenS: TokenService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  loginUser(event) {
    event.preventDefault();
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    
    this.authS.login(email, password).subscribe((data: AuthToken) => {
      this.tokenS.saveTokens(data.access_token, data.refresh_token);
      this.authS.setLoggedIn(true);
      this.router.navigate(['/']);
    });
  }

}

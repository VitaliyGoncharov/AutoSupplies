import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthLogin } from '../../../core/interfaces/auth-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authS: AuthService,
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
    this.authS.login(email, password).subscribe((data: AuthLogin) => {
      this.authS.saveTokens(data.access_token);
      this.router.navigate(['/']);
    });
  }

}

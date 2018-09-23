import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { ValidatorMessages } from '../validator-messages/validator-messages.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    ValidatorMessages
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
    ProfileComponent
  ]
})
export class UserModule { }

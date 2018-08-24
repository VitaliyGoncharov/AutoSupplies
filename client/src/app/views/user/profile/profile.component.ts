import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, SelectControlValueAccessor } from '@angular/forms';
import { discardPeriodicTasks } from '@angular/core/testing';
import * as LANG_DIRS from './../../locale/lang.conf.json';
import { UserService } from '../../../core/services/user.service';
import { UserInfo } from '../../../core/interfaces/userInfo';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileKeys: Array<string>;
  userInfo: UserInfo;

  profileInfo: Array<{key: string, value: string}>;

  constructor(
    private fb: FormBuilder,
    private userS: UserService
  ) { }

  ngOnInit() {
    this.profileInfo = [];

    this.getUserInfo().then(
      response => {
        
      },
      error => { }
    );
  }


  getUserInfo(): Promise<string> {
    return new Promise( (res, rej) => {
      let response = this.userS.getUserInfo().toPromise();
      response.then(
        (data: UserInfo) => {
          this.userInfo = data;
          res("done");
        }
      );
    });
  }
}

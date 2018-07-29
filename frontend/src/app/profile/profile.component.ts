import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, SelectControlValueAccessor } from '@angular/forms';
import { discardPeriodicTasks } from '@angular/core/testing';
import { PROFILE_PROPS, ProfileProps } from '../../locale/en_US/profile_props';
import * as LANG_DIRS from './../../locale/lang.conf.json';
import { LangService } from '../lang.service';
import { UserService } from '../user.service';
import { UserInfo } from '../userInfo';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileProps: ProfileProps;
  profileKeys: Array<string>;
  userInfo: UserInfo;

  profileInfo: Array<{key: string, value: string}>;

  constructor(
    private fb: FormBuilder,
    private langS: LangService,
    private userS: UserService
  ) { }

  ngOnInit() {
    this.profileInfo = [];

    this.getUserInfo().then(
      response => {
        this.importProfileProps(this.langS.getLangDir());
      },
      error => { }
    );
  }

  importProfileProps(lang) {
    // CAUTION! Asynchrous import may finish after the template is rendered
    // There may be a template errors because profileInfo has not been defined yet
    // use *ngIf to check if properties are populated
    import(`./../../locale/${lang}/profile_props`).then(file => {
      this.profileProps = file.PROFILE_PROPS;
      this.profileKeys = Object.keys(this.profileProps);   
      
      for (let profileKey of this.profileKeys) {
        this.profileInfo.push({
          key: this.profileProps[profileKey],
          value: this.userInfo[profileKey]
        });
      }
    });
  }

  showInput(event) {
    if (document.getElementsByClassName('profile-input--visible').length > 0) {
      this.hideInput(event);
    }
    let input = event.target.nextSibling;
    let target = event.target;
    target.classList.add("d-none");
    input.classList.add("profile-input--visible");
    input.classList.remove("d-none");
  }

  profileContainerOnClick(event) {
    if (!event.target.closest('table')) {
      this.hideInput(event);
    }
  }

  hideInput(event) {
    let activeInput = document.getElementsByClassName('profile-input--visible')[0];

    if (!activeInput) {
      return;
    }

    activeInput.classList.remove('profile-input--visible');
    activeInput.classList.add('d-none');
    activeInput.previousElementSibling.classList.remove('d-none');
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

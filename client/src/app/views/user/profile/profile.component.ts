import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, SelectControlValueAccessor } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interfaces/user';
import { of, Observable, interval, BehaviorSubject, throwError } from 'rxjs';
import { delay, switchMap, map, filter, take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private userS: UserService
  ) { }

  ngOnInit() {
    this.getUserInfo();

    this.editForm = this.fb.group({
      email: [''],
      firstname: [''],
      lastname: [''],
      birth: [''],
      gender: [''],
      address: [''],
      phone: ['']
    });
  }

  simulateFirebase(val: any, delayTime: number) {
    return interval(delayTime).pipe(
      map(index => val + " " + index)
    )
  }

  simulateHttp(val: string, delayTime: number) {
    return of(val).pipe(delay(delayTime));
  }

  getUserInfo() {
    this.userS.getUserInfo().subscribe(data => {
      this.user = data;
    });
  }

  updateUser() {
    console.log(this.editForm);
  }
}

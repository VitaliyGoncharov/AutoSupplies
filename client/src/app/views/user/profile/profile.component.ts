import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, SelectControlValueAccessor } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interfaces/user';
import { of, Observable, interval, BehaviorSubject, throwError } from 'rxjs';
import { delay, switchMap, map, filter, take, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserReq } from '../../../core/interfaces/req/user-req';

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
    private userS: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];

    this.editForm = this.fb.group({
      email: [''],
      password: [''],
      firstname: [''],
      lastname: [''],
      birth: [''],
      gender: [''],
      address: [''],
      phone: ['']
    });
  }

  updateUser() {
    let user: UserReq = {
      email: this.editForm.get('email').value,
      password: null,
      firstname: this.editForm.get('firstname').value,
      lastname: this.editForm.get('lastname').value,
      birth: this.editForm.get('birth').value,
      gender: this.editForm.get('gender').value,
      address: this.editForm.get('address').value,
      phone: this.editForm.get('phone').value,
    }

    if (this.editForm.get('password').value) {
      user.password = this.editForm.get('password').value;
    }

    this.userS.update(user).subscribe(data => this.router.navigate(['/']));
  }
}

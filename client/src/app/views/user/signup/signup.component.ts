import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from "../../../core/services/validator.service";
import { PasswordsEqualValidator } from "../../../core/validators/password-equal";
import { UserReq } from "../../../core/interfaces/req/user-req";
import { UserService } from "../../../core/services/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

    private signupForm: FormGroup;
    private count: number = 5;
    signedup: boolean = false;

    fieldNames = {
        email: "Почта",
        password: "Пароль",
        passwordConfirm: "Подтверждение пароля",
        firstname: "Имя",
        lastname: "Фамилия"
    }

    constructor(
        private userS: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                ValidatorService.emailValidator
            ]),
            password: new FormControl('', [Validators.required, ValidatorService.passwordValidator]),
            passwordConfirm: new FormControl('', [Validators.required]),
            firstname: new FormControl('', [Validators.required]),
            lastname: new FormControl('', [Validators.required])
        }, { validators: PasswordsEqualValidator })
    }

    signup() {
        let controls = this.signupForm.controls;
        let user: UserReq = UserReq.createForSignup(
            controls.email.value,
            controls.password.value,
            controls.firstname.value,
            controls.lastname.value,
        );

        this.userS.signup(user).subscribe(data => {
            this.signedup = true;
            let interval = setInterval( () => {
                if (this.count == 0) {
                    clearInterval(interval);
                    console.log("[SignUpComponent] Navigate to '/login'");
                    this.router.navigate(['/login']);
                } else {
                    --this.count;
                }
            }, 1000);
        });
    }

    get email() { return this.signupForm.get('email') }
}
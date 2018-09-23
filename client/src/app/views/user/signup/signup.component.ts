import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ValidatorService } from "../../../core/services/validator.service";
import { PasswordsEqualValidator } from "../../../core/validators/password-equal";

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

    private signupForm: FormGroup;
    fieldNames = {
        email: "Почта",
        password: "Пароль",
        passwordConfirm: "Подтверждение пароля",
        firstname: "Имя",
        lastname: "Фамилия"
    }

    constructor() {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                ValidatorService.emailValidator
            ]),
            password: new FormControl('', [Validators.required, ValidatorService.passwordValidator]),
            passwordConfirm: new FormControl(),
            firstname: new FormControl('', [Validators.required]),
            lastname: new FormControl('', [Validators.required])
        }, { validators: PasswordsEqualValidator })
    }

    signup() {
        console.log(this.signupForm);
    }

    get email() { return this.signupForm.get('email') }
}
import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const PasswordsEqualValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const password = group.get('password').value;
    const password_repeat = group.get('passwordConfirm').value;

    if (password != password_repeat || password_repeat == '') {
        group.get('password_repeat').setErrors({ 'passwordsNotEqual': true });
    } else {
        group.get('passwordConfirm').setErrors(null);
    }

    // Actually I don't use this returning object
    // But it required for button to be disabled or not [disabled]="!signupForm.valid"
    return password == password_repeat ? null : { 'passwordsNotEqual': true };
}
import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const PasswordsEqualValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    if (password != passwordConfirm) {
        group.get('passwordConfirm').setErrors({ 'passwordsNotEqual': true });
    } else if (passwordConfirm == '') {
        group.get('passwordConfirm').setErrors({ 'required': true });
    } else {
        group.get('passwordConfirm').setErrors(null);
    }

    // Actually I don't use this returning object
    // But it required for button to be disabled or not [disabled]="!signupForm.valid"
    return password == passwordConfirm ? null : { 'passwordsNotEqual': true };
}
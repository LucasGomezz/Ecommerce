import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

export const confirmPasswordValidator = (password: AbstractControl): AsyncValidatorFn =>
    (repeatedPassword: AbstractControl) =>
        new Promise<ValidationErrors | null>(res => {
            !repeatedPassword.dirty ||
                repeatedPassword.value === password.value
                ? res(null)
                : res({ PasswordNoMatch: true });
        });

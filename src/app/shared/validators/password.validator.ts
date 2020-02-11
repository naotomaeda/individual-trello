import { AbstractControl } from '@angular/forms';

const numbers = /[0-9]/;
const letters = /[a-zA-Z]/;

export function ValidatePassword(control: AbstractControl) {
    if (!(control.value.length >= 6) || !control.value.match(letters) || !control.value.match(numbers)) {
        return { validPassword: true };
    }
    return null;
}
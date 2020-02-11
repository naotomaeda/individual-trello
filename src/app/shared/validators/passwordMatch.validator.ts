import { AbstractControl, ValidatorFn, FormControl } from '@angular/forms';

export function ValidatePasswordMatch(password): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => control.value !== password.value ? { match: true } : null;
}
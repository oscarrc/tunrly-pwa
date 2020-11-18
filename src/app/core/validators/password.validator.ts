import {ValidatorFn, ValidationErrors, FormGroup} from '@angular/forms';

export class PasswordValidator {
  static checkPassword(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
        const password = group.get('password').value;
        const repeatpassword = group.get('repeatpassword').value;

        return password === repeatpassword ? null : { equal: true }
    };
  }
}
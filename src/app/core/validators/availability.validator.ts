import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { UserService } from '../../services/user.service';

export class AvailabilityValidator {
  static checkAvailability(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return userService.check(control.value).pipe(
        map((result) =>  {
          return result['available'] ? null : { notAvailable: true }
        } )
      );
    };
  }
}
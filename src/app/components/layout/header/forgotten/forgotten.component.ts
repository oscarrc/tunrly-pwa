import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ValidationService } from '../../../../services/validation.service';

@Component({
    selector: 'app-forgotten',
    templateUrl: './forgotten.component.html'
})
export class ForgottenComponent extends SimpleModalComponent<any, any> implements OnInit {

    forgotten: any;
    device: string;
    formSubmitted = false;

    constructor( private validationService:ValidationService) {
        super();
    }

    ngOnInit() {  
        this.forgotten = new FormGroup({
            user: new FormControl('', [
                Validators.email
            ]),
        });
    }

    get user() {
        return this.forgotten.get('user').value;
    }

    submitForgotten(forgotten) {
        this.formSubmitted = true;

        if (this.forgotten.invalid) {
            return false;
        }

        this.validationService.create(forgotten.value.user, 1).subscribe().add( () => this.close())
    }

}

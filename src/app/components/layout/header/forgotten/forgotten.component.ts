import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ValidationService } from 'src/app/services/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-forgotten',
    templateUrl: './forgotten.component.html'
})
export class ForgottenComponent extends SimpleModalComponent<any, any> implements OnInit {

    forgotten: any;
    loading: boolean = false;
    device: string;
    formSubmitted = false;

    constructor( private validationService:ValidationService, private toastr: ToastrService) {
        super();
    }

    ngOnInit() {  
        this.forgotten = new FormGroup({
            user: new FormControl('', [
                Validators.required
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

        this.loading = true;

        this.validationService.create(forgotten.value.user, 1).subscribe(
            () => { 
                this.toastr.success("Email sent", 'OK', { positionClass: 'toast-offset'});
                this.close();
            }
        ).add( () => {
            this.loading = false;
        })
    }

}

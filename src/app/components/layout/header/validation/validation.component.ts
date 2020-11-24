import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ValidationService } from 'src/app/services/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-validation-modal',
    templateUrl: './validation.component.html'
})
export class ValidationComponent extends SimpleModalComponent<any, any> implements OnInit {

    constructor(private validationService:ValidationService, private toastr: ToastrService) {
        super();
    }

    email:string;
    title:string;
    disabled: boolean;

    ngOnInit() {
        if(!this.email){
            this.close();
        }else{
            this.sendValidation();
        }
    }

    sendValidation(){
        this.disabled = true;
        this.validationService.create(this.email, 0).subscribe(
            () => { this.toastr.success('Email sent', 'OK') }
        ).add(
            () => setTimeout( () => { this.disabled = false }, 60000 )
        );
    }

}

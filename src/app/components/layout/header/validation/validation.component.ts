import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ValidationService } from '../../../../services/validation.service';

@Component({
    selector: 'app-validation-modal',
    templateUrl: './validation.component.html'
})
export class ValidationComponent extends SimpleModalComponent<any, any> implements OnInit {

    constructor(private validationService:ValidationService) {
        super();
    }

    email:string;
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
        this.validationService.create(this.email, 0).subscribe().add(
            () => setTimeout( () => { this.disabled = false }, 60000 )
        );
    }

}

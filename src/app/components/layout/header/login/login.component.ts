import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { SimpleModalService } from 'ngx-simple-modal';

import { AuthService } from '../../../../services/auth.service';

import { ValidationComponent } from '../../../layout/header/validation/validation.component';
import { ForgottenComponent } from '../../../layout/header/forgotten/forgotten.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: any;
    loading: boolean = false;
    formSubmitted = false;

    constructor(private simpleModalService: SimpleModalService,
                private authService:AuthService) {
        super();
    }

    ngOnInit() {  
        this.login = new FormGroup({
            user: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ]),
            remember: new FormControl(false),
        });
    }

    openForgotten(){
        this.close();
        this.simpleModalService.addModal(ForgottenComponent,{});
    }

    submitLogin(login) {
        this.formSubmitted = true;

        if (this.login.invalid) {
            return false;
        }
        
        this.loading = true;

        this.authService.login(login.value.user, login.value.password, login.value.remember).subscribe(
            () => {
                this.close();
            },
            err => {
                this.loading = false;

                if( err.error?.name === "NotActive"){
                    this.simpleModalService.addModal(ValidationComponent, { email: login.value.user });
                    this.close();
                }
            }
        );
    }

}

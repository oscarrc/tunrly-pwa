import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { SimpleModalService } from 'ngx-simple-modal';

import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { ValidationComponent } from '../../../layout/header/validation/validation.component';
import { ForgottenComponent } from '../../../layout/header/forgotten/forgotten.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: any;
    formSubmitted = false;

    constructor(private router:Router,
                private simpleModalService: SimpleModalService,
                private authService:AuthService) {
        super();
    }

    ngOnInit() {  
        this.login = new FormGroup({
            user: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$')
            ]),
            remember: new FormControl(false),
        });
    }

    get user() {
        return this.login.get('user').value;
    }

    get password() {
        return this.login.get('password').value;
    }

    get remember() {
        return this.login.get('remember').value;
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

        this.authService.login(login.value.user, login.value.password, login.value.remember).subscribe(
            res => {
                 this.router.navigate(['/home']);
                 this.close();
            },
            err => {
                if( err.error.name === "NotActive"){
                    this.simpleModalService.addModal(ValidationComponent, { email: this.user });
                    this.close();
                }
            }
        );
    }

}

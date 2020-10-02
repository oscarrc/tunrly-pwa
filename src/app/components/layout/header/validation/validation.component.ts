import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html'
})
export class ValidationComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: any;
    device: string;
    formSubmitted = false;

    constructor(private router:Router,
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

    submitLogin(login) {
        this.formSubmitted = true;

        if (this.login.invalid) {
            return false;
        }

        this.authService.login(login.value.user, login.value.password, login.value.remember).subscribe(
            res => {
                if (res){
                    this.router.navigate(['/home']);
                    this.close();
                }
            }
        );
    }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { Config } from '../../../../config/config';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends SimpleModalComponent<any, any> implements OnInit {

    login: any;
    formSubmitted = false;

    constructor(private localStorageService: LocalStorageService) {
        super();
    }

    ngOnInit() {
        this.login = new FormGroup({
            userName: new FormControl('listen_app@kri8thm.com', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('123456789', [
                Validators.required
            ]),
        });
    }

    get userName() {
        return this.login.get('userName');
    }

    get password() {
        return this.login.get('password');
    }

    submitLogin() {
        this.formSubmitted = true;
        if (this.login.invalid) {
            return false;
        }

        // You can replace this object with your user object
        const user = {
            id: 1,
            role: 'ADMIN',
            userName: this.login.controls.userName.value,
            image: './assets/images/users/thumb.jpg',
            name: 'Halo Admin'
        };
        this.localStorageService.setLocalStorage(Config.CURRENT_USER, user);
        this.close();
    }

}

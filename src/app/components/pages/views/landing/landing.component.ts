import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoginComponent } from 'src/app/components/layout/header/login/login.component';
import { ValidationComponent } from 'src/app/components/layout/header/validation/validation.component';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { AvailabilityValidator } from 'src/app/core/validators/availability.validator';
import { PasswordValidator } from 'src/app/core/validators/password.validator';

import { Config } from 'src/app/config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit, AfterViewInit {

    config: Config;
    brand: any = {};
    backgroundImage: string = "";
    registration: any;
    loading: boolean = false;
    formSubmitted: boolean = false;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private simpleModalService: SimpleModalService,
                private translateService: TranslateService) {
        this.config = new Config();
        this.brand = this.config.config.brand;
    }

    ngOnInit() {
        this.backgroundImage = this.getRandomBackground();

        this.registration = new FormGroup({
            username: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^([a-z0-9]+(?:[ _.-][a-z0-9]+)*){5,15}$')
                ],
                AvailabilityValidator.checkAvailability(this.userService)
            ),
            email: new FormControl('', [
                    Validators.required,
                    Validators.email
                ],
                AvailabilityValidator.checkAvailability(this.userService)
            ),
            firstname: new FormControl('', [
                Validators.required
            ]),
            lastname: new FormControl('', [
                Validators.required
            ]),
            passgroup: new FormGroup({
                password: new FormControl('', [
                    Validators.required,
                    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$')
                ]),
                repeatpassword: new FormControl('', [
                    Validators.required
                ])
            }, PasswordValidator.checkPassword() ),
            tac: new FormControl('', [
                Validators.required
            ])
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    openLoginModal() {
        this.simpleModalService.addModal(LoginComponent, {});
    }

    register(registration){
        const lang = this.translateService.getBrowserLang();
        this.formSubmitted = true;
        
        if (this.registration.invalid) {
            return false;
        }

        this.loading = true;

        const user = {
            username: registration.value.username,
            email: registration.value.email,
            firstname: registration.value.firstname,
            lastname: registration.value.lastname,
            password: registration.value.passgroup.password,
            language: lang.match(/en|es/) ? lang : 'en'
        }

        this.userService.create(user).subscribe(
            () => {
                registration.reset();
                this.formSubmitted = false;
                this.simpleModalService.addModal(ValidationComponent, {email: user.email});
            }
        ).add( () => this.loading = false )
    }

    getRandomBackground(){
        const number = Math.floor(Math.random() * 6) + 1;
        return "assets/images/background/header-" + number + ".jpg";
    }
}
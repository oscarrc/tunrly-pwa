import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoginComponent } from '../../../layout/header/login/login.component';
import { ValidationComponent } from '../../../layout/header/validation/validation.component';
import { LoadingService } from '../../../../services/loading.service';
import { UserService } from '../../../../services/user.service';
import { AvailabilityValidator } from '../../../../core/validators/availability.validator';
import { PasswordValidator } from '../../../../core/validators/password.validator';

import { Config } from '../../../../config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit, AfterViewInit {

    config: Config;
    brand: any = {};
    sliderConfig: any = {};
    trendingArtists: any = [];
    backgroundImage: string = "";
    registration: any;
    loading: boolean = false;
    formSubmitted: boolean = false;
    browserLang: string;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private simpleModalService: SimpleModalService) {
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

        this.sliderConfig = {
            arrows: false,
            dots: false,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            speed: 1000,
            autoplay: true,
            // Breakpoints
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        };
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    openLoginModal() {
        this.simpleModalService.addModal(LoginComponent, {});
    }

    openValidationModal(email) {
        this.simpleModalService.addModal(ValidationComponent, {email: email, title: "Your Tunrly.com account has been created"});
    }

    register(registration){
        this.formSubmitted = true;
        
        if (this.registration.invalid) {
            return false;
        }

        this.loading = true;

        let user = registration.value;

        delete user.tac;
        delete user.repeatpassword;

        this.userService.create(user).subscribe(
            () => {
                registration.reset();
                this.formSubmitted = false;
                this.openValidationModal(user.email);
            }
        ).add( () => this.loading = false )
    }

    getRandomBackground(){
        const number = Math.floor(Math.random() * 6) + 1;
        return "assets/images/background/header-" + number + ".jpg";
    }

}

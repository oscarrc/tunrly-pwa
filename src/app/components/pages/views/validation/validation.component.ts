import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';
import { ValidationService } from 'src/app/services/validation.service';
import { PasswordValidator } from 'src/app/core/validators/password.validator';
import { Config } from 'src/app/config/config';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html'
})
export class ValidationComponent implements OnInit, OnDestroy{
    routeSubscription: Subscription;
    action: number;
    token: string;
    success: boolean;
    error: string;
    done: boolean = false;
    loading: boolean = false;

    reset: any;
    formSubmitted:boolean = false;
    
    config: Config;
    brand: any = {};

    constructor(private loadingService: LoadingService,
                private validationService: ValidationService,
                private route: ActivatedRoute,) {
                    this.config = new Config();
                    this.brand = this.config.config.brand;
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.action = parseInt(param.action);
                        this.token = param.token;
                    });
                }

    get password() {
        return this.reset.get('password').value;
    }

    get repeatpassword() {
        return this.reset.get('repeatpassword').value;
    }

    doValidate(password:string = null){
        this.loading = true;
        
        return this.validationService.validate(this.token, this.action, password).subscribe( 
            res => { this.success = true },
            err => { this.success = false; this.error = err.error.name;}
        )
    }

    ngOnInit() {
        this.reset = new FormGroup({
            password: new FormControl('', [
                Validators.required,
                Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$')
            ]),
            repeatpassword: new FormControl('', [
                Validators.required
            ])
        }, PasswordValidator.checkPassword());

        if( this.action == 1){              
            this.done = false;      
            this.loadingService.stopLoading();
        }else{
            this.done = true;
            this.doValidate().add(() => {
                this.loadingService.stopLoading()
           });
        }
    }

    doReset(reset){
        this.formSubmitted = true;
        
        if (this.reset.invalid) {
            return false;
        }

        this.loading = true;
        
        this.doValidate(reset.value.password).add(() => {
            this.loadingService.stopLoading();
            this.done = true;
            this.loading = false;
        });
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }
}

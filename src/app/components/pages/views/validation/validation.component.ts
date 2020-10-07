import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../services/loading.service';
import { ValidationService } from '../../../../services/validation.service';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html'
})
export class ValidationComponent implements OnInit, AfterViewInit, OnDestroy{
    routeSubscription: Subscription;
    action: number;
    token: string;
    password: string;
    success: boolean;
    error: string;

    //TODO handle password reset
    constructor(private loadingService: LoadingService,
                private validationService: ValidationService,
                private route: ActivatedRoute,) {
        this.routeSubscription = this.route.params.subscribe(param => {
            this.action = param.action;
            this.token = param.token;
        });
    }

    ngOnInit() {
        this.validationService.validate(this.token, this.action, this.password).subscribe( 
            res => { this.success = true },
            err => { this.success = false; this.error = err.error.message;}
        ).add(() => {
            this.loadingService.stopLoading()
       });
    }

    ngAfterViewInit() {
        
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }
}

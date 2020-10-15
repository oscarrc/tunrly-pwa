import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../../services/loading.service';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-settings',
    templateUrl: './settings.component.html'
})
export class UserSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

    settings: any;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService, private userService: UserService) { }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            this.settings = user.settings;
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}

import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../../services/loading.service';
import { UserService } from '../../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-profile',
    templateUrl: './profile.component.html'
})
export class UserProfileComponent implements OnInit, AfterViewInit, OnDestroy {

    userProfile: any;
    private userSubscription: Subscription;
    
    constructor(private loadingService: LoadingService, private userService: UserService) { }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            this.userProfile = user;
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}

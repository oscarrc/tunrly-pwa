import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../../services/loading.service';
import { UserService } from '../../../../../services/user.service';
import { AuthService } from '../../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-settings',
    templateUrl: './settings.component.html'
})
export class UserSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

    settings: any;
    settingsForm: any;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService, private userService: UserService, private authService: AuthService) { }

    clearHistory(){
        this.userService.update({ history: [] }).subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    saveSettings(){
        const lastSettings = this.settings;
        this.userService.update({settings: this.settings}).subscribe(
            res => { this.userService.set(res) },
            err => { this.settings = lastSettings }
        )
    }

    closeAllSessions(){
        this.authService.logout(false);
    }

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

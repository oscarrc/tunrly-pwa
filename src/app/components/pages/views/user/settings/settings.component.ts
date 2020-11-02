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
    lastSettings: any;
    settingsForm: any;
    loading: boolean = false;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService, 
                private userService: UserService, 
                private authService: AuthService) { }

    clearHistory(){
        this.userService.update({ history: [] }).subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    saveSettings(){
        this.loading = true;

        return this.userService.update({settings: this.settings}).subscribe(
            res => { 
                this.userService.set(res)
             },
            err => { this.settings = this.lastSettings }
        ).add( () => this.loading = false )
    }

    changeTheme(){
        this.loadingService.startLoading();
        this.saveSettings().add( () => this.loadingService.stopLoading() );
    }

    closeAllSessions(){
        this.authService.logout(false);
    }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            this.settings = user.settings;
            this.lastSettings = this.settings;
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}

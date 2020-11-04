import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SkinService } from './services/skin.service';
import { LoadingService } from './services/loading.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Tunrly.com';
    themeClass = 'theme-dark';
    skinSubscription: Subscription;
    
    constructor( @Inject(DOCUMENT) private document: Document,
                private loadingService: LoadingService,
                private skinService: SkinService,
                private userService: UserService,
                private authService: AuthService,
                private translateService: TranslateService) {
        this.loadingService.startLoading();
        this.translateService.setDefaultLang('en');        
    }

    initUser(){
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        if(!user){
            this.userService.get().subscribe( user => {
                this.userService.set(user);
            })
        }else{
            this.userService.set(user);
        }
    }


    ngOnInit() {
        const browserLang = this.translateService.getBrowserLang();
        this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');

        this.document.body.classList.add(this.themeClass);
              
        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if(skin == 'light') {
                this.document.body.classList.remove(this.themeClass);
            }else{             
                this.document.body.classList.add(this.themeClass);
            }
        });
                
        if(this.authService.loggedIn) this.initUser();
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
    }
}
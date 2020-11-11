import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SkinService } from './services/skin.service';
import { LoadingService } from './services/loading.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import { StorageService } from './services/storage.service';

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
                private storageService: StorageService,
                private translateService: TranslateService) {
                            
        this.initLang();
        this.initTheme(); 
    }

    initUser(){
        const user = this.storageService.getCurrentUser();
        
        if(!user){
            this.userService.get().subscribe( user => {
                this.userService.set(user);
            })
        }else{
            this.userService.set(user);
        }
    }

    initLang(){
        const lang = this.storageService.getLang();
        const browserLang = this.translateService.getBrowserLang();
        
        this.loadingService.startLoading();
        this.translateService.setDefaultLang('en');

        if(lang){
            this.translateService.use(lang);
        }else{
            this.translateService.use(browserLang.match(/en|es/) ? browserLang : 'en');
        }
    }

    initTheme(){
        const theme = this.storageService.getThemeSkin();
        
        if(theme) this.skinService.skin = theme;

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if(skin == 'light') {
                this.document.body.classList.remove(this.themeClass);
            }else{             
                this.document.body.classList.add(this.themeClass);
            }
        });

        this.document.body.classList.add(this.themeClass);
    }



    ngOnInit() {       
        if(this.authService.loggedIn) this.initUser();
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
    }
}
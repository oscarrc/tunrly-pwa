import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SkinService } from './services/skin.service';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Tunrly.com';

    constructor( @Inject(DOCUMENT) private document: Document,
                private loadingService: LoadingService,
                private skinService: SkinService) {
        this.loadingService.startLoading();
    }

    themeClass = 'theme-dark';

    skinSubscription: Subscription;


    ngOnInit() {
        this.document.body.classList.add(this.themeClass);
              
        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin == 'light') {
                this.document.body.classList.remove(this.themeClass);
            }else{             
                this.document.body.classList.add(this.themeClass);
            }
        });
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
    }
}
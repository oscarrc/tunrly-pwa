import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuConfigService } from '../../../../services/menu.service';
import { SkinService } from '../../../../services/skin.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { Config } from '../../../../config/config';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-aside-left',
    templateUrl: './aside-left.component.html'
})
export class AsideLeftComponent implements OnInit, OnDestroy {

    menuItems: any = [];
    asideFooterButton: any = {};
    sidebarClass = 'sidebar-primary';

    skinSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                public menuConfigService: MenuConfigService,
                private localStorageService: LocalStorageService,
                private skinService: SkinService) {
        this.menuItems = this.menuConfigService.menuItems;

        this.asideFooterButton = {
            icon: 'ion-md-play-circle',
            title: 'Weekly playlist'
        };
    }

    ngOnInit() {
        const themeSkin = this.localStorageService.getThemeSkin();
        if (themeSkin) {
            this.sidebarClass = 'sidebar-' + Config.THEME_CLASSES[themeSkin.sidebar];
        }

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.sidebarClass = 'sidebar-' + Config.THEME_CLASSES[skin.sidebar];
            }
        });
    }

    hideSidebar() {
        this.document.body.classList.remove(Config.classes.openSidebar);
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
    }

}

import {Component, Inject, OnDestroy,} from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuConfigService } from 'src/app/services/menu.service';
import { Config } from 'src/app/config/config';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-aside-left',
    templateUrl: './aside-left.component.html'
})
export class AsideLeftComponent implements OnDestroy {

    menuItems: any = [];
    asideFooterButton: any = {};
    sidebarClass:string = 'sidebar-primary';

    skinSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                public menuConfigService: MenuConfigService) {
        this.menuItems = this.menuConfigService.menuItems;

        this.asideFooterButton = {
            icon: 'ion-md-play-circle',
            title: 'Weekly playlist'
        };
    }

    hideSidebar() {
        this.document.body.classList.remove(Config.classes.openSidebar);
    }

    ngOnDestroy() {
        this.skinSubscription?.unsubscribe();
    }

}

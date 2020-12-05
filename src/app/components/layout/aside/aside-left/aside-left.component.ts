import {Component, Inject, OnDestroy, ElementRef, AfterViewInit, ViewChild,} from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuConfigService } from 'src/app/services/menu.service';
import { Config } from 'src/app/config/config';
import {DOCUMENT} from '@angular/common';

@Component({
    selector: 'app-aside-left',
    templateUrl: './aside-left.component.html'
})
export class AsideLeftComponent implements AfterViewInit, OnDestroy {

    menuItems: any = [];
    asideFooterButton: any = {};
    sidebarClass:string = 'sidebar-primary';

    skinSubscription: Subscription;

    @ViewChild("bannerAd") banner: ElementRef;

    constructor(@Inject(DOCUMENT) private document: Document,
                public menuConfigService: MenuConfigService) {
        this.menuItems = this.menuConfigService.menuItems;

        this.asideFooterButton = {
            icon: 'ion-md-cafe',
            title: 'menu.coffee'
        };
    }

    hideSidebar() {
        this.document.body.classList.remove(Config.classes.openSidebar);
    }

    ngAfterViewInit(){
        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//p419738.clksite.com/adServe/banners?tid=419738_823520_0';
        this.banner.nativeElement.appendChild(script);
    }

    ngOnDestroy() {
        this.skinSubscription?.unsubscribe();
    }

}

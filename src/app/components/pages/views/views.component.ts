import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit, OnDestroy {

    themeClass = 'theme-light';

    skinSubscription: Subscription;
    routerSubscription: Subscription;

    @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;

    constructor(@Inject(DOCUMENT) private document: Document,
                private router: Router) { }

    ngOnInit() {
        this.routerSubscription = this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return false;
            }
            this.perfectScroll.directiveRef.update();
            this.perfectScroll.directiveRef.scrollToTop(0, 100);
        });
    }

    // Set class to header on scroll of body
    psBodyScroll(event) {
        const scrollTop = event.target.scrollTop;
        const header = this.document.getElementById('header');
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    ngOnDestroy() {
        this.routerSubscription?.unsubscribe();
    }

}

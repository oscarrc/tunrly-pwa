import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html'
})
export class ViewsComponent implements OnInit, OnDestroy {

    themeClass:string = 'theme-light';
    showPlaylist:string = 'show-playlist';
    limitReached:boolean = false;
    skinSubscription: Subscription;
    routerSubscription: Subscription;
    scrollSubscription: Subscription;

    @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;

    constructor(@Inject(DOCUMENT) private document: Document,
                private router: Router,
                private scrollService: ScrollService) { }

    ngOnInit() {
        this.routerSubscription = this.router.events.subscribe(() => {
            this.perfectScroll.directiveRef.update();
            this.perfectScroll.directiveRef.scrollToTop(0, 100);
            this.document.body.classList.remove(this.showPlaylist);
        });

        this.scrollSubscription = this.scrollService.limitReached.subscribe(
            reached => this.limitReached = reached
        )
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

    psScrollDown(event){
        const limit = event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop - this.document.getElementById('footer').clientHeight

        if(limit <= 0 && !this.limitReached){
            this.scrollService.reached();
        }
    }
    
    ngOnDestroy() {
        this.routerSubscription?.unsubscribe();
    }

}

import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SimpleModalService } from 'ngx-simple-modal';
import { LanguageComponent } from './language/language.component';
import { SearchService } from '../../../services/search.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';
import { SkinService } from '../../../services/skin.service';
import { Config } from '../../../config/config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    @ViewChild('headerBackdrop') backdrop: ElementRef;
    headerClasses = 'bg-primary';

    language: any = {};
    currentUser: any = {};

    private searchSubscription: Subscription;
    private skinSubscription: Subscription;
    private userSubscription: Subscription;

    searchForm: any;
    pressEnter: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document,
                private searchService: SearchService,
                private simpleModalService: SimpleModalService,
                private localStorageService: LocalStorageService,
                private userService: UserService,
                private skinService: SkinService) {
        this.language = {
            title: 'Language',
            image: './assets/images/svg/translate.svg'
        };
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            query: new FormControl('', [
                Validators.required
            ])
        });

        const themeSkin = this.localStorageService.getThemeSkin();
       
        if (themeSkin) {
            this.headerClasses = 'bg-' + Config.THEME_CLASSES[themeSkin.header];
        }

        this.userSubscription = this.userService.user.subscribe( user => {
            this.currentUser = user;
        });

        this.searchSubscription = this.searchService.hideSearch.subscribe((value) => {
            if (value) {
                this.hideSearchResults();
            }
        });

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.headerClasses = 'bg-' + Config.THEME_CLASSES[skin.header];
            }
        });
    }

    doSearch(){
        if(this.searchForm.valid){
            this.searchService.doSearch(this.searchForm.get('query').value).subscribe(
                res => {
                    this.searchService.searchResults = res
                    if(res) this.showSearchResults();
                },
                err => console.log(err)
            )
        }
    }

    showSearchResults() {
        this.document.body.classList.add(Config.classes.openSearch);
        this.backdrop.nativeElement.classList.add(Config.classes.show);
    }

    hideSearchResults() {
        this.document.body.classList.remove(Config.classes.openSearch);
        this.backdrop.nativeElement.classList.remove(Config.classes.show);
    }

    openLanguagesModal() {
        this.hideSearchResults();
        this.simpleModalService.addModal(LanguageComponent, {});
    }

    openSidebar() {
        this.document.body.classList.add(Config.classes.openSidebar);
    }

    toggleSearchFocus(){
        if( !this.pressEnter && this.searchService.searchResults.length ){
            this.showSearchResults();
        }
        this.pressEnter = !this.pressEnter
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
        this.skinSubscription.unsubscribe();
        this.userSubscription.unsubscribe();
    }

}

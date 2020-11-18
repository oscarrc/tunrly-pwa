import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { SimpleModalService } from 'ngx-simple-modal';
import { LanguageComponent } from './language/language.component';
import { SearchService } from 'src/app/services/search.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { SkinService } from 'src/app/services/skin.service';
import { Config } from 'src/app/config/config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    @ViewChild('headerBackdrop') backdrop: ElementRef;
    headerClasses = 'bg-primary';

    languageIcon: any;
    currentUser: any = {};

    private searchSubscription: Subscription;
    private skinSubscription: Subscription;
    private userSubscription: Subscription;

    searchForm: any;
    pressEnter: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document,
                private searchService: SearchService,
                private simpleModalService: SimpleModalService,
                private storageService: StorageService,
                private userService: UserService,
                private skinService: SkinService) {
        this.languageIcon = './assets/images/svg/translate.svg';
    }

    ngOnInit() {
        this.searchForm = new FormGroup({
            query: new FormControl('', [
                Validators.required
            ])
        });

        const themeSkin = this.storageService.getThemeSkin();
       
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
            this.showSearchResults();
            
            this.searchService.status = true;            
            this.searchService.query = this.searchForm.get('query').value;

            this.searchService.doSearch().subscribe(
                res => {
                    this.searchService.results = res
                }
            ).add( () => {                
                this.searchService.status = false
            })
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
        if( this.searchForm.get('query').value && this.searchService.query ){
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

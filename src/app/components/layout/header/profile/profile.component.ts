import { Component, Input, OnInit } from '@angular/core';

import { MenuConfigService } from '../../../../services/menu.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    @Input() user: any = {};

    userMenu: any = [];

    constructor(private searchService: SearchService,
                private menuConfigService: MenuConfigService,
                private authService: AuthService) {
        this.userMenu = this.menuConfigService.userMenuItems;
    }

    ngOnInit() {
    }

    logout(){
        this.authService.logout();
    }

    closeSearchResult() {
        this.searchService.hideSearchResult();
    }
}

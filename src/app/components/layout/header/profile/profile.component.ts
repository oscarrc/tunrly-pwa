import { Component, Input } from '@angular/core';

import { MenuConfigService } from 'src/app/services/menu.service';
import { SearchService } from 'src/app/services/search.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {

    @Input() user: any = {};

    userMenu: any = [];

    constructor(private searchService: SearchService,
                private menuConfigService: MenuConfigService,
                private authService: AuthService) {
        this.userMenu = this.menuConfigService.userMenuItems;
    }

    logout(){
        this.authService.logout();
    }

    closeSearchResult() {
        this.searchService.hideSearchResult();
    }
}

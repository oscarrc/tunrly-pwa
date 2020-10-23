import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, AfterViewInit {

    currentUser: any;

    constructor(private loadingService: LoadingService,
                private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.currentUser = this.localStorageService.getCurrentUser();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

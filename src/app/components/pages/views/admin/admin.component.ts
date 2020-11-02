import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, AfterViewInit {

    currentUser: any;

    constructor(private loadingService: LoadingService,
                private storageService: StorageService) { }

    ngOnInit() {
        this.currentUser = this.storageService.getCurrentUser();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

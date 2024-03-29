import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    loading:boolean = false;
    loadingSubscription: Subscription;

    constructor(private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadingSubscription = this.loadingService.loadingStatus.subscribe((value) => {
            this.loading = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }

}

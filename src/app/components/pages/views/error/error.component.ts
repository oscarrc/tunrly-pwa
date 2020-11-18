import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

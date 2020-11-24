import { AfterViewInit, Component } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

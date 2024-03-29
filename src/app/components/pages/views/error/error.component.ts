import { AfterViewInit, Component } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { Config } from 'src/app/config/config';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements AfterViewInit {

    config: Config;
    brand: any = {};

    constructor(private loadingService: LoadingService) {
        this.config = new Config();
        this.brand = this.config.config.brand;
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

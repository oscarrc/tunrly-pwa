import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../../../services/loading.service';

@Component({
    selector: 'app-edit-playlist',
    templateUrl: './edit-playlist.component.html'
})
export class EditPlaylistComponent implements OnInit, AfterViewInit {

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { TrackService } from '../../../../services/track.service';

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html'
})
export class TracksComponent implements OnInit, AfterViewInit {

    tracks: any = [];
    gridView = false;
    country: string = '';
    page: number = 1;
    limit: number = 10;

    constructor(private loadingService: LoadingService,
                private trackService: TrackService) { }

    ngOnInit() {
        this.initSongs();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
        this.initSongs();
    }

    prevPage(){
        this.page = this.page - 1;
        this.initSongs();
    }

    // Initialize songs
    initSongs() {
        this.trackService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.tracks = res,
            err => console.log(err)
        )
    }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { TrackService } from '../../../../services/track.service';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit, AfterViewInit {

    songs: any = [];
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
            res => this.songs = res,
            err => console.log(err)
        )
    }

}

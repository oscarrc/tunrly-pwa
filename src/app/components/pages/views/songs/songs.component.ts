import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { SongsConfigService } from '../../../../services/songs-config.service';

@Component({
    selector: 'app-songs',
    templateUrl: './songs.component.html'
})
export class SongsComponent implements OnInit, AfterViewInit {

    songs: any = {};
    gridView = false;

    constructor(private loadingService: LoadingService,
                private songsConfigService: SongsConfigService) { }

    ngOnInit() {
        this.initSongs();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize songs
    initSongs() {
        this.songs.list = this.songsConfigService.songsList;
        this.songs.record = 5124;
    }

}

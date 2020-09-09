import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { PlaylistService } from '../../../../services/playlist.service';

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit, AfterViewInit {
    playlists: any = [];
    page: number = 1;
    limit: number = 10;

    constructor(private loadingService: LoadingService,
        private playlistService: PlaylistService) {}

    ngOnInit() {
        this.initPlaylists();
    }

    nextPage(){
        this.page = this.page + 1;
        this.initPlaylists();
    }

    prevPage(){
        this.page = this.page - 1;
        this.initPlaylists();
    }

    // Initialize songs
    initPlaylists() {
        this.playlistService.get(null, this.page, this.limit).subscribe(
            res => this.playlists = res,
            err => console.log(err)
        )
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }
}
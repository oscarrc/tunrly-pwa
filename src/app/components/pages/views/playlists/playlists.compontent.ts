import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit, AfterViewInit {
    playlists: any = [];
    page: number = 1;
    limit: number = 8;
    loading: boolean = true;

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

    initPlaylists() {
        this.loading = true;

        this.playlistService.get(null, this.page, this.limit).subscribe(
            res => this.playlists = res
        ).add( () => this.loading = false )
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }
}
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { AudioPlayerService } from '../../../../../services/audio-player.service';
import { AlbumService } from '../../../../../services/album.service';


@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html'
})
export class AlbumDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    albumId: number;
    albumName: string;
    artistName: string;
    artistDetails: any;
    albumDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private audioPlayerService: AudioPlayerService,
                private albumService: AlbumService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.albumName = param.name;
                this.artistName = param.artist;
                this.getAlbumDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize static data for display
    getAlbumDetails() {
        this.albumService.getInfo(this.albumName, this.artistName).subscribe(
            res => this.albumDetails = res,
            err => console.log(err)
        )
    }
   
    playAllSongs() {
        this.audioPlayerService.playNowPlaylist(this.albumDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

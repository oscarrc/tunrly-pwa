import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { PlayerService } from '../../../../../services/player.service';
import { PlaylistService } from '../../../../../services/playlist.service';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html'
})
export class PlaylistDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    playlistImage: string;
    playlistId: string;
    imageSrc: string;
    playlistDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private loadingService: LoadingService,
        private PlayerService: PlayerService,
        private playlistService: PlaylistService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.playlistId = param.id;
                this.getPlaylistDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize static data for display
    getPlaylistDetails() {
        this.playlistService.getInfo(this.playlistId).subscribe(
            res => this.playlistDetails = res,
            err => console.log(err)
        )
    }
   
    playAllSongs() {
        this.PlayerService.playNowPlaylist(this.playlistDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

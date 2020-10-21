import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { PlayerService } from '../../../../../services/player.service';
import { PlaylistService } from '../../../../../services/playlist.service';
import { UserService } from 'src/app/services/user.service';

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
        private playerService: PlayerService,
        private playlistService: PlaylistService,
        private userService: UserService) {
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

    addFavorite() {
        this.userService.setFavorite(this.playlistDetails._id, 'playlist').subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    isFavorite(){
        return this.playlistDetails?._id ? this.userService.isFavorite(this.playlistDetails._id, 'playlist') : false;
    }

    // Initialize static data for display
    getPlaylistDetails() {
        this.playlistService.getInfo(this.playlistId).subscribe(
            res => this.playlistDetails = res,
            err => console.log(err)
        )
    }
   
    playAllSongs() {
        this.playerService.playNowPlaylist(this.playlistDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { AudioPlayerService } from '../../../../../services/audio-player.service';
import { TrackService } from '../../../../../services/track.service';

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html'
})
export class SongDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    songName: string;
    songArtist: string;
    songDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private audioPlayerService: AudioPlayerService,
                private trackService: TrackService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.name) {
                this.songName = param.name;
                this.songArtist = param.artist;
                this.getSongDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getSongDetails() {
        this.trackService.getInfo(this.songName, this.songArtist).subscribe(
            res => this.songDetails = res,
            err => console.log(err)
        )
    }

    getSimilar(){
        if(!this.songDetails.similar || this.songDetails.similar.length == 0){
            this.trackService.getSimilar(this.songDetails._id).subscribe(
                res => this.songDetails.similar = res,
                err => console.log(err)
            )
        }
    }

    addInPlayer() {
        this.audioPlayerService.playSong(this.songDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

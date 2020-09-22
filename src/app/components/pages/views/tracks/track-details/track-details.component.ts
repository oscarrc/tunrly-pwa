import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { PlayerService } from '../../../../../services/player.service';
import { TrackService } from '../../../../../services/track.service';

@Component({
    selector: 'app-track-details',
    templateUrl: './track-details.component.html'
})
export class TrackDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    trackName: string;
    trackArtist: string;
    trackDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private playerService: PlayerService,
                private trackService: TrackService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.name) {
                this.trackName = param.name;
                this.trackArtist = param.artist;
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
        this.trackService.getInfo(this.trackName, this.trackArtist).subscribe(
            res => this.trackDetails = res,
            err => console.log(err)
        )
    }

    getSimilar(){
        if(!this.trackDetails.similar || this.trackDetails.similar.length == 0){
            this.trackService.getSimilar(this.trackDetails._id).subscribe(
                res => this.trackDetails.similar = res,
                err => console.log(err)
            )
        }
    }

    addInPlayer() {
        this.playerService.playTrack(this.trackDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { PlayerService } from '../../../../../services/player.service';
import { TrackService } from '../../../../../services/track.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-track-details',
    templateUrl: './track-details.component.html'
})
export class TrackDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

    trackName: string;
    trackArtist: string;
    trackDetails: any;
    loading: boolean = false;
    gridView:boolean = false;
    similarTracks: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private playerService: PlayerService,
                private trackService: TrackService,
                private userService: UserService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.name) {
                this.trackName = param.name;
                this.trackArtist = param.artist;
                this.getTrackDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    addFavorite() {
        this.userService.setFavorite(this.trackDetails._id, 'track').subscribe(
            res => { this.userService.set(res) }
        )
    }

    isFavorite(){
        return this.userService.isFavorite(this.trackDetails._id, 'track');
    }

    getTrackDetails() {
        this.loading = true;

        this.trackService.getInfo(this.trackName, this.trackArtist).subscribe(
            res => {
                this.trackDetails = res;
                this.initSimilar()
            }
        ).add( () => this.loading = false )
    }

    initSimilar(){
        this.similarTracks = {
            title: 'tracks.similar',
            subTitle: 'tracks.alsolike',
            page: '/track/' + this.trackDetails._id + '/similar',
            loading: true,
            items: []
        };

        
        if(!this.trackDetails.similar || !this.trackDetails.similar.length){
            this.trackService.getSimilar(this.trackDetails._id).subscribe(
                res => {
                    this.trackDetails.similar = res;
                    this.similarTracks.loading = false;
                }
            )
        }else{
            this.similarTracks.items = this.trackDetails.similar;
            this.similarTracks.loading = false;
        }
    }

    addInPlayer() {
        this.playerService.playTrack(this.trackDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

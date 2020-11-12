import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { UserService } from '../../../../../services/user.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-user-recommended',
    templateUrl: './recommended.component.html'
})
export class UserRecommendedComponent implements OnInit, AfterViewInit, OnDestroy{

    tracks: any = [];
    gridView = false;
    country: string = ''; 
    page: number = 1;
    limit: number = 10;
    loading: boolean = false;

    userSubscription: Subscription;

    constructor(private playerService: PlayerService,
                private userService: UserService,
                private loadingService: LoadingService) {
                }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            this.tracks = [];

            user.favorite.track.forEach( track => {
                if(track.similar) this.tracks = this.tracks.concat(track.similar.slice(0,5));
            });
    
            user.favorite.artist.forEach( artist => {
                if(artist.similar){
                    artist.similar.slice(0,5).forEach( similar => {
                        this.tracks = this.tracks.concat(similar.tracks);
                    })
                }
            })
        }).add( () => { this.loading = false })
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
    }

    prevPage(){
        this.page = this.page - 1;
    }

    playAllSongs() {
        this.playerService.playNowPlaylist({
            name: "Recommended for you",
            description: "We hope you'll like these songs",
            tracks: this.tracks
        });
    }

    ngOnDestroy(){
        this.userSubscription?.unsubscribe();
    }
}

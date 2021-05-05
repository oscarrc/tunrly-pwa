import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-user-history',
    templateUrl: './history.component.html'
})
export class UserHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

    history: any = {};
    page: number = 1;
    limit: number = 12;
    gridView: boolean = false;

    private userSubscription: any;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private trackService: TrackService,
                private playerService: PlayerService) { }

    playAllSongs() {
        this.playerService.playNowPlaylist({
            tracks: this.history.items
        });
    }

    nextPage(){
        this.page++;
        this.getTracks(this.history.list)
    }

    prevPage(){
        this.page--
        this.getTracks(this.history.list)
    }

    getTracks(tracks){
        const offset = (this.page - 1) * this.limit;
        const limit = this.limit * this.page

        this.history.loading = true;
        this.trackService.getTracks( tracks.slice(offset, limit)).subscribe( tracks => {    
            this.history.items = tracks;
        }).add( () => this.history.loading = false );
    }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => { 
                this.history = {
                    title: 'user.history.title',
                    subtitle: 'user.history.subtitle',
                    list: user.history.reverse(),
                    loading: true,
                    items: []
                };
                this.getTracks(this.history.list)
            }
        )
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription?.unsubscribe();
    }
}

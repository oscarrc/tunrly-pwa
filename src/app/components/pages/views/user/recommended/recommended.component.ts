import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
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

    constructor(private playerService: PlayerService,
                private userService: UserService,
                private loadingService: LoadingService) {}

    ngOnInit() {
        this.loading = true;
        this.userService.getRecommended().subscribe( 
            tracks => this.tracks = tracks
        ).add(() => this.loading = false );
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
    }
}

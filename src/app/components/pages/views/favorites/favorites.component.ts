import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit, AfterViewInit, OnDestroy {

    songs: any = {};
    favorites: any = {};
    gridView:boolean = false;
    limit:number = 12;
    page = {
        artist: 1,
        album: 1,
        track: 1,
        playlist: 1
    }

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService,
                private userService: UserService) { }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.favorites = user.favorite;
                this.initSongs();
            }
        );
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }

    getSimilar(){
        let tracks = [];

        this.favorites.track.forEach(track => {
            tracks = tracks.concat(track.similar);    
        });

        this.favorites.artist.forEach( artist => {
            artist.similar.forEach( similar => {
                tracks = tracks.concat(similar.tracks)
            })
        });

        return tracks.sort( (a, b) => { return 0.5 - Math.random() });
    }

    nextPage(type){
        const count = this.favorites[type].length;

        if((count / this.limit) < this.page[type]){
            this.page[type]++
        }
    }

    prevPage(type){
        if(this.page[type] > 1){
            this.page[type]--
        }
    }
   
    // Initialize song object for section
    initSongs() {
        this.songs = {
            title: 'Also Like',
            subTitle: 'Check it out these songs',
            page: '/songs',
            items: this.getSimilar()
        };
    }

}

import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-favorites',
    templateUrl: './favorites.component.html'
})
export class UserFavoritesComponent implements OnInit, AfterViewInit, OnDestroy {

    songs: any = {};
    favorites: any = [];
    favorite: any = {
        artists: {
            items: [],
            page: 1,
            loading: false
        },
        albums: {
            items: [],
            page: 1,
            loading: false
        },
        tracks: {
            items: [],
            page: 1,
            loading: false
        },
        playlists: {
            items: [],
            page: 1,
            loading: false
        }
    };
    gridView:boolean = false;
    limit:number = 12;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private artistService: UserService,
                private albumService: AlbumService,
                private trackService: TrackService) { }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.favorites = user?.favorite;
                this.getTracks(user.favorite.track);
            }
        );
    }

    getArtists(){

    }

    getAlbums(){

    }

    getTracks(tracks){
        const offset = (this.favorite.tracks.page - 1) * this.limit;

        if(this.favorite.tracks.items.slice(offset, this.limit).length == 0 ){
            this.trackService.getTracks( tracks.slice(offset, this.limit)).subscribe( tracks => {
                this.favorite.tracks = tracks;
            });
        }
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
            if(artist.similar){
                artist.similar.forEach( similar => {
                    tracks = tracks.concat(similar.tracks)
                })
            }
        });

        return tracks.sort( (a, b) => { return 0.5 - Math.random() });
    }

    nextPage(type){
        const count = this.favorites[type].length;

        if((count / this.limit) > this.favorite[type].page){
            this.favorite[type].page++
        }
    }

    prevPage(type){
        if(this.favorite[type].page > 1){
            this.favorite[type].page--
        }
    }
   
    // Initialize song object for section
    initSongs() {
        this.songs = {
            title: 'user.favorites.alsolike',
            subtitle: 'user.favorites.checkout',
            page: '/user/recommended',
            items: this.getSimilar()
        };
    }

}

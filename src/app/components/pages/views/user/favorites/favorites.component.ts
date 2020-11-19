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

    artists = {
        list: [],
        items: [],
        page: 1,
        loading: false
    };
    albums = {
        list: [],
        items: [],
        page: 1,
        loading: false
    };
    tracks = {
        list: [],
        items: [],
        page: 1,
        loading: false
    };
    playlists = {
        list: [],
        items: [],
        page: 1,
        loading: false
    };
    recommended = {
        list: [],
        items: [],
        page: 1,
        loading: false
    }
    gridView:boolean = false;
    limit:number = 12;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private artistService: ArtistService,
                private albumService: AlbumService,
                private trackService: TrackService) {}

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.artists.list = user.favorite.artist.reverse();
                this.albums.list = user.favorite.album.reverse();
                this.playlists.list = user.favorite.playlist.reverse();
                this.tracks.list = user.favorite.track.reverse();
                this.getTracks(this.tracks.list);
            }
        );
    }

    getArtists(artists){
        const offset = (this.artists.page - 1) * this.limit;
        
        if(this.artists.items.slice(offset, this.limit).length == 0 ){
            this.artists.loading = true;
            this.artistService.getArtists( artists.slice(offset, this.limit)).subscribe( artists => {
                this.artists.items = artists;
            }).add( () => this.artists.loading = false);
        }
    }

    getAlbums(albums){
        const offset = (this.albums.page - 1) * this.limit;

        if(this.albums.items.slice(offset, this.limit).length == 0 ){
            this.albums.loading = true;
            this.albumService.getAlbums( albums.slice(offset, this.limit)).subscribe( albums => {
                this.albums.items = albums;
            }).add( () => this.albums.loading = false);
        }
    }

    getTracks(tracks){
        const offset = (this.tracks.page - 1) * this.limit;

        if(this.tracks.items.slice(offset, this.limit).length == 0 ){
            this.tracks.loading = true;
            this.trackService.getTracks( tracks.slice(offset, this.limit)).subscribe( tracks => {
                this.tracks.items = tracks;
            }).add( () => this.tracks.loading = false);;
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

        // this.favorites.track.forEach(track => {
        //     tracks = tracks.concat(track.similar);    
        // });

        // this.favorites.artist.forEach( artist => {
        //     if(artist.similar){
        //         artist.similar.forEach( similar => {
        //             tracks = tracks.concat(similar.tracks)
        //         })
        //     }
        // });

        return tracks.sort( (a, b) => { return 0.5 - Math.random() });
    }

    nextPage(type){
        const count = this[type].length;

        if((count / this.limit) > this[type].page){
            this[type].page++
        }
    }

    prevPage(type){
        if(this[type].page > 1){
            this[type].page--
        }
    }
}

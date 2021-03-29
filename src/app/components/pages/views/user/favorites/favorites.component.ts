import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { Subscription } from 'rxjs';
import { PlaylistService } from 'src/app/services/playlist.service';

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
        title: 'user.favorites.alsolike',
        subtitle: 'user.favorites.checkout',
        items: [],
        page: '/user/recommended',
        loading: false,
    };
    gridView:boolean = false;
    limit:number = 12;

    private userSubscription: Subscription;

    constructor(private loadingService: LoadingService,
                private userService: UserService,
                private artistService: ArtistService,
                private albumService: AlbumService,
                private trackService: TrackService,
                private playlistService: PlaylistService) {}

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.artists.list = user.favorite.artist.reverse();
                this.albums.list = user.favorite.album.reverse();
                this.playlists.list = user.favorite.playlist.reverse();
                this.tracks.list = user.favorite.track.reverse();
                this.getTracks(this.tracks.list);
                this.getRecommended();
            }
        );
    }

    getEntities(type){
        switch(type){
            case 'albums':
                this.getAlbums(this.albums.list);
                break;
            case 'artists':
                this.getArtists(this.artists.list);
                break;
            case 'tracks':
                this.getTracks(this.tracks.list);
                break;
            case 'playlists':
                this.getPlaylists(this.playlists.list);
                break;
        }
    }

    getArtists(artists){
        const offset = (this.artists.page - 1) * this.limit;  
        const limit = this.limit * this.artists.page;      
        if(this.artists.items.slice(offset, limit).length == 0 ){
            this.artists.loading = true;
            this.artistService.getArtists( artists.slice(offset, limit)).subscribe( artists => {
                this.artists.items = this.artists.items.concat(artists);
            }).add( () => this.artists.loading = false);
        }
    }

    getAlbums(albums){
        const offset = (this.albums.page - 1) * this.limit;
        const limit = this.limit * this.albums.page;
        if(this.albums.items.slice(offset, limit).length == 0 ){
            this.albums.loading = true;
            this.albumService.getAlbums( albums.slice(offset, limit)).subscribe( albums => {
                this.albums.items = this.albums.items.concat(albums);
            }).add( () => this.albums.loading = false);
        }
    }

    getTracks(tracks){
        const offset = (this.tracks.page - 1) * this.limit;
        const limit = this.limit * this.tracks.page;
        if(this.tracks.items.slice(offset, limit).length == 0 ){
            this.tracks.loading = true;            
            this.trackService.getTracks(tracks.slice(offset, limit)).subscribe( tracks => {
                this.tracks.items = this.tracks.items.concat(tracks);
            }).add( () => this.tracks.loading = false);;
        }
    }

    getPlaylists(playlists){
        const offset = (this.playlists.page - 1) * this.limit;
        const limit = this.limit * this.playlists.page;
        if(this.playlists.items.slice(offset, limit).length == 0 ){
            this.playlists.loading = true;
            this.playlistService.getPlaylists( playlists.slice(offset, limit)).subscribe( playlists => {
                this.playlists.items = this.playlists.items.concat(playlists);
            }).add( () => this.playlists.loading = false);;
        }
    }

    getRecommended(){
        this.userService.getRecommended().subscribe( tracks => {
            tracks = tracks.sort( () => { return 0.5 - Math.random() });
            this.recommended.items = tracks.slice(0,10)
        });
    }

    nextPage(type){
        const count = this[type].list.length;

        if((count / this.limit) > this[type].page){
            this[type].page++
            this.getEntities(type)
        }
    }

    prevPage(type){
        if(this[type].page > 1){
            this[type].page--
            this.getEntities(type)
        }
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }
}

import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { PlayerService } from 'src/app/services/player.service';
import { AlbumService } from 'src/app/services/album.service';

import { ShareComponent } from 'src/app/components/layout/share/share.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements AfterViewInit, OnDestroy{
    private routeSubscription: Subscription;

    user:any;
    favorite={
        artists:{
            items: [],
            page: 1,
            loading: false
        },
        albums:{
            items: [],
            page: 1,
            loading: false
        },
        tracks:{
            items: [],
            page: 1,
            loading: false
        },
        playlists:{
            items: [],
            page: 1,
            loading: false
        }
    }

    page:number = 1;
    limit:number = 12;
    loading:boolean = true;
    gridView:boolean = false;
    selected:string = "tracks"

    constructor(private route: ActivatedRoute, 
                private simpleModalService: SimpleModalService,
                private loadingService: LoadingService,
                private userService: UserService,
                private artistService: ArtistService,
                private albumService: AlbumService,
                private trackService: TrackService,
                private playlistService: PlaylistService,
                private playerService: PlayerService) { 
                    this.routeSubscription = this.route.params.subscribe(param => {
                        if (param.username) {
                            this.getUser(param.username);
                        }
                    });
                }

    getUser(username){
        this.user = this.userService.get(username).subscribe(
            res => this.user = res
        ).add( () => this.loading = false )
    }

    getArtists(artists){
        const offset = (this.favorite.artists.page - 1) * this.limit;
        
        if(artists && this.favorite.artists.items.slice(offset, this.limit).length == 0 ){
            this.favorite.artists.loading = true;
            this.artistService.getArtists( artists.slice(offset, this.limit)).subscribe( artists => {
                this.favorite.artists.items = artists;
            }).add( () => this.favorite.artists.loading = false);
        }
    }

    getAlbums(albums){
        const offset = (this.favorite.albums.page - 1) * this.limit;

        if(albums && this.favorite.albums.items.slice(offset, this.limit).length == 0 ){
            this.favorite.albums.loading = true;
            this.albumService.getAlbums( albums.slice(offset, this.limit)).subscribe( albums => {
                this.favorite.albums.items = albums;
            }).add( () => this.favorite.albums.loading = false);
        }
    }

    getTracks(tracks){
        const offset = (this.favorite.tracks.page - 1) * this.limit;
        
        if(tracks && this.favorite.tracks.items.slice(offset, this.limit).length == 0 ){
            this.favorite.tracks.loading = true;
            this.trackService.getTracks( tracks.slice(offset, this.limit)).subscribe( tracks => {
                this.favorite.tracks.items = tracks;
            }).add( () => this.favorite.tracks.loading = false);
        }
    }

    getPlaylists(playlists){
        const offset = (this.favorite.playlists.page - 1) * this.limit;

        if(playlists && this.favorite.playlists.items.slice(offset, this.limit).length == 0 ){
            this.favorite.playlists.loading = true;
            this.playlistService.getPlaylists( playlists.slice(offset, this.limit)).subscribe( playlists => {
                this.favorite.playlists.items = playlists;
            }).add( () => this.favorite.playlists.loading = false);;
        }
    }

    getEntities(){
        switch(this.selected){
            case 'albums':
                this.getAlbums(this.user.favorite.album);
                break;
            case 'artists':
                this.getArtists(this.user.favorite.artist);
                break;
            case 'tracks':
                this.getTracks(this.user.favorite.track);
                break;
            case 'playlists':
                this.getPlaylists(this.user.favorite.playlist);
                break;
        }
    }

    nextPage(){
        this.favorite[this.selected].page = this.favorite[this.selected].page + 1;
        this.getEntities();
    }

    prevPage(){
        this.favorite[this.selected].page = this.favorite[this.selected].page - 1;
        this.getEntities();
    }

    addInPlayer(){
        this.trackService.getTracks( this.user.favorite.track).subscribe( tracks => {
            this.playerService.playNowPlaylist({
                name: this.user.username + '\'s favorite tracks',
                tracks: tracks
            });
        })
    }

    doShare(){
        this.simpleModalService.addModal(ShareComponent, { 
            title: this.user?.username + ' profile.',
            description: 'Check ' + this.user?.username + '\'s profile on Tunrly.com',
            image: this.user?.image,
            tags: ''
        });
    }
   
    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }
}

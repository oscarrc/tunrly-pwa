import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';
import { ArtistService } from 'src/app/services/artist.service';
import { UserService } from 'src/app/services/user.service';

import { ShareComponent } from 'src/app/components/layout/share/share.component';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements AfterViewInit, OnDestroy {
    
    artistName: string
    artistDetails: any;
    imageBorderRadiusClass: string = "card-img--radius-lg";
    loading: boolean = false;
    loadingTracks: boolean = false;
    loadingAlbums: boolean = false;
    loadingSimilar: boolean = false;
    
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private simpleModalService: SimpleModalService,
                private loadingService: LoadingService,
                private playerService: PlayerService,
                private artistService: ArtistService,
                private userService: UserService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.name) {
                this.artistName = param.name;
                this.getArtistDetails();
            }
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    addFavorite() {
        this.userService.setFavorite(this.artistDetails._id, 'artist').subscribe(
            res => { this.userService.set(res) }
        )
    }

    isFavorite():boolean{
        return this.userService.isFavorite(this.artistDetails?._id, 'artist');
    }

    getArtistDetails() {
        this.loading = true;

        this.artistService.getInfo(this.artistName).subscribe(
            res => {
                this.artistDetails = res;
                this.getTracks();
            }
        ).add( () => this.loading = false )
    }

    getTracks(){
        if(!this.artistDetails.tracks || this.artistDetails.tracks.length == 0){
            this.loadingTracks = true;
            this.artistService.getTracks(this.artistDetails._id).subscribe(
                res => this.artistDetails.tracks = res
            ).add( () => this.loadingTracks = false);
        }
    }

    getAlbums(){
        if(!this.artistDetails.albums || this.artistDetails.albums.length == 0){
            this.loadingAlbums = true;
            this.artistService.getAlbums(this.artistDetails._id).subscribe(
                res => this.artistDetails.albums = res
            ).add( () => this.loadingAlbums = false);
        }
    }

    getSimilar(){
        if(!this.artistDetails.similar || this.artistDetails.similar.length == 0){
            this.loadingSimilar = true;
            this.artistService.getSimilar(this.artistDetails._id).subscribe(
                res => this.artistDetails.similar = res
            ).add( () => this.loadingSimilar = false);
        }
    }

    playAllSongs() {
        this.playerService.playNowPlaylist(this.artistDetails);
    }

    doShare(){
        this.simpleModalService.addModal(ShareComponent, { 
            title: this.artistDetails?.name + ' music.',
            description: 'Listen to ' + this.artistDetails?.name + ' music.',
            image: this.artistDetails?.image.thumbnail[this.artistDetails?.image.thumbnail.length - 1],
            tags: this.artistDetails?.tags.map( t => t.replace(/( |-)/gi, '')).join(',')
         });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

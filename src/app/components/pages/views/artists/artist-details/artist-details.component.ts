import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { AudioPlayerService } from '../../../../../services/audio-player.service';
import { ArtistService } from '../../../../../services/artist.service';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    
    artistName: string
    artistDetails: any;
    background: any;
    thumbnail: any;
    imageBorderRadiusClass: string = "card-img--radius-lg";
    
    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private audioPlayerService: AudioPlayerService,
                private artistService: ArtistService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.name) {
                this.artistName = param.name;
                this.getArtistDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getArtistDetails() {
        this.artistService.getInfo(this.artistName).subscribe(
            res => {
                this.artistDetails = res;                
                this.thumbnail = this.artistDetails.image?.thumbnail ? this.getRandomImage(this.artistDetails.image.thumbnail) : 
                                    this.artistDetails.image?.background ? this.getRandomImage(this.artistDetails.image.background) : '';
                this.background = this.artistDetails.image?.background ? this.getRandomImage(this.artistDetails.image.background) : 
                                    this.artistDetails.image?.thumbnail ? this.getRandomImage(this.artistDetails.image.thumbnail) : '';
            },
            err => console.log(err)
        )
    }

    getRandomImage(images: Array<string>){
        const size = images.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return images[rand];
    }

    getTracks(){
        if(!this.artistDetails.tracks || this.artistDetails.tracks.length == 0){
            this.artistService.getTracks(this.artistDetails._id).subscribe(
                res => {
                    this.artistDetails.tracks = res
                },
                err => console.log(err)
            )
        }
    }

    getAlbums(){
        if(!this.artistDetails.albums || this.artistDetails.albums.length == 0){
            this.artistService.getAlbums(this.artistDetails._id).subscribe(
                res => this.artistDetails.albums = res,
                err => console.log(err)
            )
        }
    }

    getSimilar(){
        if(!this.artistDetails.similar || this.artistDetails.similar.length == 0){
            this.artistService.getSimilar(this.artistDetails._id).subscribe(
                res => this.artistDetails.similar = res,
                err => console.log(err)
            )
        }
    }

    playAllSongs() {
        this.audioPlayerService.playNowPlaylist(this.artistDetails);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

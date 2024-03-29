import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';
import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html'
})
export class TracksComponent implements AfterViewInit, OnDestroy{

    tracks: any = [];
    gridView = false;
    country: string = '';
    id: string = '';
    type: string='';
    page: number = 1;
    limit: number = 12;
    loading: boolean = true;
    
    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private trackService: TrackService,
                private artistService: ArtistService,
                private playerService: PlayerService) { 
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.type = this.route.snapshot.url[2]?.path;
                        this.id = param.id;
                        this.getContent();
                    });
                }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
        this.getContent();
    }

    prevPage(){
        this.page = this.page - 1;
        this.getContent();
    }

    getContent(){
        this.loading = true;
        switch(this.type){
            case "similar":
                this.getSimilar();
                break;
            case "tracks":
                this.getArtistTracks();
                break;
            default:
                this.getTracks();
                break;
        }
    }

    getTracks() {
        this.trackService.getTop(this.country, this.page, this.limit).subscribe(
            res =>  this.tracks = res 
        ).add( () => this.loading = false )
    }

    getArtistTracks() {
        this.artistService.getTracks(this.id, this.page, this.limit).subscribe(
            res => this.tracks = res
        ).add( () => this.loading = false )
    }

    getSimilar() {
        this.trackService.getSimilar(this.id, this.page, this.limit).subscribe(
            res => this.tracks = res
        ).add( () => this.loading = false )
    }

    playAllSongs() {
        this.playerService.playNowPlaylist({
            tracks: this.tracks
        });
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }
}

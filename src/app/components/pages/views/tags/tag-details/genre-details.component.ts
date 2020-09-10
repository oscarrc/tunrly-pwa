import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { AudioPlayerService } from '../../../../../services/audio-player.service';
import { TagService } from '../../../../../services/tag.service';

@Component({
    selector: 'app-genre-details',
    templateUrl: './genre-details.component.html'
})
export class GenreDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    carouselArrowPosClass1 = 'arrow-pos-1';
    carouselArrowPosClass2 = 'arrow-pos-2';
    carouselArrowPosClass3 = 'arrow-pos-3';

    tagName: any;
    artists: any = {};
    albums: any = {};
    tracks: any = {};
    playlists: any = {};

    imageBorderRadiusClass: string = "card-img--radius-lg";
    
    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private audioPlayerService: AudioPlayerService,
                private tagService: TagService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.tagName = param.name;
                this.getTags('');
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getTags(type: string){
        this.tagService.getTag(this.tagName, type, 1, 10).subscribe(
            res => { 
                this.artists = {
                    title: this.tagName + " artists",
                    subTitle: '',
                    page: '/artists',
                    loading: true,
                    items: res["artist"]
                };
                this.albums = {
                    title: this.tagName + " albums",
                    subTitle: '',
                    page: '/albums',
                    loading: true,
                    items: res["album"]
                };
                this.tracks = {
                    title: this.tagName + " songs",
                    subTitle: '',
                    page: '/songs',
                    loading: true,
                    items: res["track"]
                };
                this.playlists =  {
                    title: this.tagName + " playlists",
                    subTitle: '',
                    page: '/playlists',
                    loading: true,
                    items: res["playlist"]
                };
            },
            err => console.log(err)
        )
    }

    playSong() {
    }

    playAlbum() {
    }

    playArtist() {
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

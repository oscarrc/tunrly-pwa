import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { PlayerService } from '../../../../../services/player.service';
import { TagService } from '../../../../../services/tag.service';

@Component({
    selector: 'app-tag-details',
    templateUrl: './tag-details.component.html'
})
export class TagDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
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
                private PlayerService: PlayerService,
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

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return elements[rand];
    }

    getTags(type: string){
        this.tagService.getTag(this.tagName, type, 1, 10).subscribe(
            res => { 
                this.artists = {
                    title: this.tagName + " artists",
                    subTitle: '',
                    page: '/tag/' + this.tagName + '/artists',
                    loading: true,
                    items: res["artist"]
                };
                this.albums = {
                    title: this.tagName + " albums",
                    subTitle: '',
                    page: '/tag/' + this.tagName + '/albums',
                    loading: true,
                    items: res["album"]
                };
                this.tracks = {
                    title: this.tagName + " tracks",
                    subTitle: '',
                    page: '/tag/' + this.tagName + '/tracks',
                    loading: true,
                    items: res["track"]
                };
                this.playlists =  {
                    title: this.tagName + " playlists",
                    subTitle: '',
                    page: '/tag/' + this.tagName + '/playlists',
                    loading: true,
                    items: res["playlist"]
                };             
            },
            err => console.log(err)
        )
    }

    playTrack() {
    }

    playAlbum() {
    }

    playArtist() {
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

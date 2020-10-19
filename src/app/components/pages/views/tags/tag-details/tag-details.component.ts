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
                private tagService: TagService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.tagName = param.name;
                this.getTags('');
            }
        });
    }

    ngOnInit() {    
        this.artists = {
            title: this.tagName + " artists",
            page: '/tag/' + this.tagName + '/tracks',
            loading: true
        };
        this.albums = {
            title: this.tagName + " albums",
            page: '/tag/' + this.tagName + '/albums',          
            subTitle: '',
            loading: true
        };
        this.tracks = {
            title: this.tagName + " tracks",
            page: '/tag/' + this.tagName + '/tracks',            
            subTitle: '',
            loading: true
        };
        this.playlists = {
            title: this.tagName + " playlists",
            page: '/tag/' + this.tagName + '/playlists',            
            subTitle: '',
            loading: true
        };
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
                this.artists.loading = false,
                this.artists.items= res["artist"]    
                this.albums.loading = false,
                this.albums.items= res["album"]    
                this.tracks.loading = false,
                this.tracks.items= res["track"]    
                this.playlists.loading = false,
                this.playlists.items= res["playlist"]        
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

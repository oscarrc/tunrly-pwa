import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
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
            }
        });
    }

    ngOnInit() {    
        this.initTracks()
        this.initArtists();
        this.initAlbums();
        this.initPlaylists();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return elements[rand];
    }

    initArtists(){
        this.artists = {
            title: this.tagName + " artists",
            page: '/tag/' + this.tagName + '/tracks',
            loading: true
        };

        this.tagService.getTag(this.tagName, 'artists', 1, 10).subscribe(
            res => {
                this.artists.items= res;
                this.artists.loading = false;  
            },
            err => console.log(err)
        )
    }

    initAlbums(){ 
        this.albums = {
            title: this.tagName + " albums",
            page: '/tag/' + this.tagName + '/albums',          
            subTitle: '',
            loading: true
        };

        this.tagService.getTag(this.tagName, 'albums', 1, 10).subscribe(
            res => { 
                this.albums.items= res; 
                this.albums.loading = false; 
            },
            err => console.log(err)
        )
    }

    initTracks(){         
        this.tracks = {
            title: this.tagName + " tracks",
            page: '/tag/' + this.tagName + '/tracks',            
            subTitle: '',
            loading: true
        };

        this.tagService.getTag(this.tagName, 'tracks', 1, 10).subscribe(
            res => {
                this.tracks.items= res;                    
                this.tracks.loading = false;
            },
            err => console.log(err)
        )
    }

    initPlaylists(){
        this.playlists = {
            title: this.tagName + " playlists",
            page: '/tag/' + this.tagName + '/playlists',            
            subTitle: '',
            loading: true
        };

        this.tagService.getTag(this.tagName, 'playlists', 1, 10).subscribe(
            res => {  
                this.playlists.items= res;
                this.playlists.loading = false     
            },
            err => console.log(err)
        )
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

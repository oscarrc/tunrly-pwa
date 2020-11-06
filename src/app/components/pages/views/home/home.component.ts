import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { TrackService } from '../../../../services/track.service';
import { ArtistService } from '../../../../services/artist.service';
import { TagService } from '../../../../services/tag.service';
import { UserService } from '../../../../services/user.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
    // private userSubscription: Subscription;
    
    carouselArrowPosClass1 = 'arrow-pos-1';
    carouselArrowPosClass2 = 'arrow-pos-2';
    carouselArrowPosClass3 = 'arrow-pos-3';

    topTracks: any = {};
    topArtists: any = {};
    topTags: any = {};
    playlist: any = {};
    history: any = {};
    recommended: any = {};

    mainEvent: any = {};
    secondaryEvents: any = [];

    constructor(private loadingService: LoadingService,
                private trackService: TrackService,
                private artistService: ArtistService,
                private tagService: TagService,
                private userService: UserService) {}

    ngOnInit() {
        this.userService.user.subscribe( user => {
            this.initHistory(user.history.slice(0,9));
            this.initRecommended(user.favorite);       
        }).unsubscribe();

        this.initTopTracks();
        this.initTopArtists();
        this.initTopTags();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return elements[rand];
    }

    // Initialize top tracks object
    initTopTracks() {
        this.topTracks = {
            title: 'home.toptracks.title',
            subTitle: 'home.toptracks.subtitle',
            page: '/tracks',
            loading: true,
            items: []
        };
        
        this.trackService.getTop('', 1, 10).subscribe(
            res => {
                this.topTracks.items = res;
                this.topTracks.loading = false;
            },
            err => console.log(err)
        )
    }

    // Initialize top tracks object
    initTopArtists() {
        this.topArtists = {
            title: 'home.topartists.title',
            subTitle: 'home.topartists.subtitle',
            page: '/artists',
            loading: true,
            items: []
        };
        
        this.artistService.getTop('', 1, 10).subscribe(
            res => {
                this.topArtists.items = res;
                this.topArtists.loading = false;
            },
            err => console.log(err)
        );
    }

    // Initialize top tracks object
    initTopTags() {
        this.topTags = {
            title: 'home.toptags.title',
            subTitle: 'home.toptags.subtitle',
            page: '/tags',
            loading: true,
            items: []
        };
        
        this.tagService.getTop(1, 10).subscribe(
            res => {
                this.topTags.items = res;
                this.topTags.loading = false;
            },
            err => console.log(err)
        )
    }
 
    // Initialize music playlist object for section
    initPlaylist() {
        this.playlist = {
          title: 'home.playlists.title',
          subTitle: 'home.playlists.subtitle',
          page: '/playlist',
          items: []
        };
    }

    //Initialize user history
    initHistory(history) {
        this.history = {
            title: 'home.history.title',
            subTitle: 'home.history.subtitle',
            page: '/user/history',
            loading: false,
            items: history.sort( () => { return 0.5 - Math.random() })
        };
    }

    //Initialize user recommendations
    initRecommended(favorites) {
        let tracks = [];

        favorites.track.forEach( track => {
            tracks = tracks.concat(track.similar.slice(0,5))
        });

        favorites.artist.forEach( artist => {
            artist.similar.slice(0,5).forEach( similar => {
                tracks = tracks.concat(similar.tracks);
            })
        })

        this.recommended = {
            title: 'home.recommended.title',
            subTitle: 'home.recommended.subtitle',
            page: '/user/recommended',
            loading: false,
            items: tracks.sort( () => { return 0.5 - Math.random() }).slice(0,10)
        };
    }
}

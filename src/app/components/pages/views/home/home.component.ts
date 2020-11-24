import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { TrackService } from 'src/app/services/track.service';
import { ArtistService } from 'src/app/services/artist.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
    private userSubscription: Subscription;
    
    carouselArrowPosClass1:string = 'arrow-pos-1';
    carouselArrowPosClass2:string = 'arrow-pos-2';
    carouselArrowPosClass3:string = 'arrow-pos-3';

    topTracks: any = {};
    topArtists: any = {};
    topTags: any = {};
    playlist: any = {};
    history: any = {};
    recommended: any = {};

    constructor(private loadingService: LoadingService,
                private trackService: TrackService,
                private artistService: ArtistService,
                private tagService: TagService,
                private userService: UserService) {}

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe( user => {
            if(user?.history){
                this.initHistory(user.history, 9);
                this.initRecommended();
            }
        })

        this.initTopTracks();
        this.initTopArtists();
        this.initTopTags();
    }

    ngAfterViewInit() {  
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){        
        this.userSubscription.unsubscribe();
    }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return elements[rand];
    }

    initTopTracks() {
        this.topTracks = {
            title: 'home.toptracks.title',
            subtitle: 'home.toptracks.subtitle',
            page: '/tracks',
            loading: true,
            items: []
        };
        
        this.trackService.getTop('', 1, 10).subscribe(
            res =>  this.topTracks.items = res 
        ).add( () => { this.topTracks.loading = false })
    }

    initTopArtists() {
        this.topArtists = {
            title: 'home.topartists.title',
            subtitle: 'home.topartists.subtitle',
            page: '/artists',
            loading: true,
            items: []
        };
        
        this.artistService.getTop('', 1, 10).subscribe(
            res => this.topArtists.items = res
        ).add( () => this.topArtists.loading = false );
    }

    initTopTags() {
        this.topTags = {
            title: 'home.toptags.title',
            subtitle: 'home.toptags.subtitle',
            page: '/tags',
            loading: true,
            items: []
        };
        
        this.tagService.getTop(1, 10).subscribe(
            res => this.topTags.items = res
        ).add( () => { this.topTags.loading = false })
    }
 
    initPlaylist() {
        this.playlist = {
          title: 'home.playlists.title',
          subtitle: 'home.playlists.subtitle',
          page: '/playlist',
          items: []
        };
    }

    initHistory(history, size) {
        const ids = history.slice(0,size).sort( () => { return 0.5 - Math.random() })

        this.history = {
            title: 'home.history.title',
            subtitle: 'home.history.subtitle',
            page: '/user/history',
            loading: true,
            items: []
        };

        this.trackService.getTracks(ids).subscribe(
            tracks => this.history.items = tracks 
        ).add(() => this.history.loading = false)
    }

    initRecommended() {
        this.recommended = {
            title: 'home.recommended.title',
            subtitle: 'home.recommended.subtitle',
            page: '/user/recommended',
            loading: true,
            items: []
        };

        this.userService.getRecommended().subscribe( 
            tracks => this.recommended.items = tracks.slice(0,9)
        ).add(() => this.recommended.loading = false );        
    }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { PlaylistConfigService } from '../../../../services/playlist-config.service';
import { TrackService } from '../../../../services/track.service';
import { ArtistService } from '../../../../services/artist.service';
import { TagService } from '../../../../services/tag.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

    carouselArrowPosClass1 = 'arrow-pos-1';
    carouselArrowPosClass2 = 'arrow-pos-2';
    carouselArrowPosClass3 = 'arrow-pos-3';

    topTracks: any = {};
    topArtists: any = {};
    topTags: any = {};
    newRelease: any = {};
    artists: any = {};
    retro: any = {};
    playlist: any = {};
    radio: any = {};
    genres: any = {};

    mainEvent: any = {};
    secondaryEvents: any = [];

    constructor(private loadingService: LoadingService,
                private playlistConfigService: PlaylistConfigService,
                private trackService: TrackService,
                private artistService: ArtistService,
                private tagService: TagService) { }

    ngOnInit() {        
        this.initTopTracks();
        this.initTopArtists();
        this.initTopTags();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize top tracks object
    initTopTracks() {
        this.topTracks = {
            title: 'Top Tracks',
            subTitle: 'Popular tracks this week',
            page: '/songs',
            loading: true,
            items: []
        };
        
        this.trackService.getTop('', 1, 10).subscribe(
            res => this.topTracks.items = res,
            err => console.log(err)
        )
    }

    // Initialize top tracks object
    initTopArtists() {
        this.topArtists = {
            title: 'Trending Artists',
            subTitle: 'What everyone listens to',
            page: '/artists',
            loading: true,
            items: []
        };
        
        this.artistService.getTop('', 1, 10).subscribe(
            res => this.topArtists.items = res,
            err => console.log(err)
        );
    }

    // Initialize top tracks object
    initTopTags() {
        this.topTags = {
            title: 'Hot tags',
            subTitle: 'This genres are hot',
            page: '/genres',
            loading: true,
            items: []
        };
        
        this.tagService.getTop(1, 10).subscribe(
            res => this.topTags.items = res,
            err => console.log(err)
        )

        console.log(this.topTags)
    }
 
    // Initialize music playlist object for section
    initPlaylist() {
        this.playlist = {
          title: 'Your Playlist',
          subTitle: 'You best to listen',
          page: '/playlist',
          items: this.playlistConfigService.playlist
        };

        // Add songs in playlist
        const playlistItems = this.playlist.items;
        for (const playlistItem of playlistItems) {
            playlistItem.songs = []
        }
    }
}

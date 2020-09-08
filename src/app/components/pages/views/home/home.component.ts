import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { PlaylistConfigService } from '../../../../services/playlist-config.service';
import { RadioConfigService } from '../../../../services/radio-config.service';
import { GenresConfigService } from '../../../../services/genres-config.service';
import { EventsConfigService } from '../../../../services/events-config.service';
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
                private radioConfigService: RadioConfigService,
                private genresConfigService: GenresConfigService,
                private eventsConfigService: EventsConfigService,
                private trackService: TrackService,
                private artistService: ArtistService,
                private tagService: TagService) { }

    ngOnInit() {        
        this.initTopTracks();
        this.initTopArtists();
        this.initTopTags();
        this.initGenres();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    // Initialize top tracks object
    initTopTracks() {
        this.topTracks = {
            title: 'Top Tracks',
            subTitle: 'Popular tracks this week',
            page: '/tracks',
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
            subTitle: 'This tags are hot',
            page: '/tags',
            loading: true,
            items: []
        };
        
        this.tagService.getTop(1, 10).subscribe(
            res => this.topTags.items = res,
            err => console.log(err)
        )

        console.log(this.topTags)
    }

    // Initialize new release music object for section
    initNewRelease() {
        this.newRelease = {
            title: 'New Releases',
            subTitle: 'Listen recently release music',
            page: '/songs',
            items: []
        };
    }

    // Initialize music events object for section
    initEvents() {
        this.mainEvent = this.eventsConfigService.eventsList[0];
        this.secondaryEvents = this.eventsConfigService.eventsList.slice(1, 3);
    }

    // Initialize retro music object for section
    initRetro() {
        this.retro = {
            title: 'Retro Classic',
            subTitle: 'Old is gold',
            page: '/songs',
            items: []
        };
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

    // Initialize radio object for section
    initRadio() {
        this.radio = {
            title: 'Radio',
            subTitle: 'Listen live now',
            page: '/stations',
            items: this.radioConfigService.radioList
        };
    }

    // Initialize music genres object for section
    initGenres() {
        this.genres = {
            title: 'Genres',
            subTitle: 'Select you genre',
            page: '/genres',
            items: this.genresConfigService.genresList
        };
    }

}

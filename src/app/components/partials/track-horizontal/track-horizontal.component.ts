import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../services/search.service';
import { AudioPlayerService } from '../../../services/audio-player.service';

@Component({
    selector: 'app-track-horizontal',
    templateUrl: './track-horizontal.component.html'
})
export class TrackHorizontalComponent implements OnInit {

    @HostBinding('class') classes = 'song-h';

    @Input() track: any = {};
    @Input() largeImage = false;
    @Input() imageSrc: any;
    @Input() imageBorderRadiusClass = 'card-img--radius-sm';
    @Input() playlist: any;
    @Input() routeLink = '';
    @Input() trackIndex: number;

    constructor(private router: Router,
                private searchService: SearchService,
                private audioPlayerService: AudioPlayerService) { }

    @HostListener('click') onClick() {
        this.searchService.hideSearchResult();
        if (this.playlist) {
            // Add playlist in audio play and play selected song
            this.audioPlayerService.playNowPlaylist(this.playlist, this.trackIndex);
        } else if (this.routeLink) {
            this.router.navigate([this.routeLink]);
        } else {
            // Play selected song
            this.audioPlayerService.playSong(this.track);
        }
    }

    ngOnInit() {
        if (this.largeImage) {
            this.classes += ' song-h--lg';
        } else {
            this.classes += ' song-h--sm';
        }
    }

}
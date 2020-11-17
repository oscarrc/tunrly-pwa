import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from 'src/app/services/search.service';
import { PlayerService } from 'src/app/services/player.service';

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
    @Input() trackIndex: number = 0;

    constructor(private router: Router,
                private searchService: SearchService,
                private playerService: PlayerService) { }

    @HostListener('click') onClick() {
        this.searchService.hideSearchResult();
        if (this.playlist) {
            this.playerService.playNowPlaylist(this.playlist);
        } else if (this.routeLink) {
            this.router.navigate([this.routeLink]);
        } else {
            this.playerService.playTrack(this.track);
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

import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-track-list-view',
    templateUrl: './track-list-view.component.html'
})
export class TrackListViewComponent implements OnInit {

    @HostBinding('class') classes = 'song-list--item';

    @Input() track: any = {};
    @Input() trackNumber: number;
    @Input() imageSrc: any;
    @Input() imageBorderRadiusClass = 'card-img--radius-sm';
    @Input() icon = 'la-ellipsis-v';
    @Input() playlist: any;
    @Input() trackIndex: number;
    @Input() nowPlaying: number;

    constructor() { }

    ngOnInit() {
        if (this.playlist) {
            this.classes += ' track-song-container track-play-pause';
        }
    }

}

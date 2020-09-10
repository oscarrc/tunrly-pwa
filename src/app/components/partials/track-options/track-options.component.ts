import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-track-options',
    templateUrl: './track-options.component.html'
})
export class TrackOptionsComponent implements OnInit {

    @HostBinding('class') class = 'dropleft';

    @Input() track: any;
    @Input() icon = '';

    constructor() { }

    ngOnInit() {
        this.icon = 'la ' + this.icon;
    }

    addFavorite() {
        this.track.favorite = true;
    }

    addToPlayList() {
    }

    shareSong() {
    }

}

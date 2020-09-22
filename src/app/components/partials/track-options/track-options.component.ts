import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
    selector: 'app-track-options',
    templateUrl: './track-options.component.html'
})
export class TrackOptionsComponent implements OnInit {

    @HostBinding('class') class = 'dropleft';

    @Input() track: any;
    @Input() trackIndex: number = -1;
    @Input() icon = '';

    constructor(private PlayerService: PlayerService) { }

    ngOnInit() {
        this.icon = 'la ' + this.icon;
    }

    addFavorite() {
        this.track.favorite = true;
    }

    addToPlayList() {
        this.PlayerService.addToPlaylist(this.track);
    }

    removeFromPlaylist() {
        this.PlayerService.removeFromPlaylist(this.trackIndex);
    }

    shareSong() {
    }

}

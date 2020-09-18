import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio-player.service';

@Component({
    selector: 'app-track-options',
    templateUrl: './track-options.component.html'
})
export class TrackOptionsComponent implements OnInit {

    @HostBinding('class') class = 'dropleft';

    @Input() track: any;
    @Input() trackIndex: number = -1;
    @Input() icon = '';

    constructor(private audioPlayerService: AudioPlayerService) { }

    ngOnInit() {
        this.icon = 'la ' + this.icon;
        console.log(this.trackIndex);
    }

    addFavorite() {
        this.track.favorite = true;
    }

    addToPlayList() {
        this.audioPlayerService.addToPlaylist(this.track);
    }

    removeFromPlaylist() {
        this.audioPlayerService.removeFromPlaylist(this.trackIndex);
    }

    shareSong() {
    }

}

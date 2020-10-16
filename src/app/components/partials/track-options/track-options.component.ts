import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-track-options',
    templateUrl: './track-options.component.html'
})
export class TrackOptionsComponent implements OnInit {

    @HostBinding('class') class = 'dropleft';

    @Input() track: any;
    @Input() trackIndex: number = -1;
    @Input() icon = '';

    constructor(private playerService: PlayerService, private userService: UserService) { }

    ngOnInit() {
        this.icon = 'la ' + this.icon;
    }

    addFavorite() {
        this.userService.setFavorite(this.track._id, 'track').subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    addToPlayList() {
        this.playerService.addToPlaylist(this.track);
    }

    removeFromPlaylist() {
        this.playerService.removeFromPlaylist(this.trackIndex);
    }

    shareSong() {
    }

}

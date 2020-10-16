import { Component, Input, OnInit } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-primary-card',
    templateUrl: './primary-card.component.html'
})
export class PrimaryCardComponent implements OnInit {

    @Input() track: any = {};
    @Input() showOptions = false;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';

    classes = '';

    constructor(private playerService: PlayerService, private userService: UserService) {
        
    }

    ngOnInit() {
        this.classes = 'custom-card--img ' + this.imageBorderRadiusClass;
    }

    addFavorite() {
        this.userService.setFavorite(this.track._id, 'track').subscribe(
            res => { this.userService.set(res); },
            err => {}
        )
    }

    isFavorite(){
        return this.userService.isFavorite(this.track._id, 'track')
    }

    addToPlayList() {
        this.playerService.addToPlaylist(this.track);
    }
    
    shareSong() {
    }

    addInPlayer() {
        this.playerService.playTrack(this.track);
    }

}

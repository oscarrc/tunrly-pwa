import { Component, Input, OnInit } from '@angular/core';

import { PlayerService } from '../../../../services/player.service';

@Component({
    selector: 'app-primary-card',
    templateUrl: './primary-card.component.html'
})
export class PrimaryCardComponent implements OnInit {

    @Input() track: any = {};
    @Input() showOptions = false;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';

    classes = '';

    constructor(private playerService: PlayerService) {
    }

    ngOnInit() {
        this.classes = 'custom-card--img ' + this.imageBorderRadiusClass;
    }

    addFavorite() {
        this.track.favorite = true;
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

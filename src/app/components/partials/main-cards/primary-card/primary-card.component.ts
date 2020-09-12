import { Component, Input, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../../../services/audio-player.service';

@Component({
    selector: 'app-primary-card',
    templateUrl: './primary-card.component.html'
})
export class PrimaryCardComponent implements OnInit {

    @Input() track: any = {};
    @Input() showOptions = false;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';

    classes = '';

    constructor(private audioPlayerService: AudioPlayerService) {
    }

    ngOnInit() {
        this.classes = 'custom-card--img ' + this.imageBorderRadiusClass;
    }

    addFavorite() {
        this.track.favorite = true;
    }

    addInQueue() {
    }

    shareSong() {
    }

    addInPlayer() {
        this.audioPlayerService.playTrack(this.track);
    }

}

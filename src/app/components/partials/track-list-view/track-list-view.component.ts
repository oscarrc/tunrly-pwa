import { Component, HostBinding, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

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
    @Input() highlight: number = -1;
    @Input() options: boolean = true;

    @Output() buttonClicked: EventEmitter<number> = new EventEmitter<number>();

    constructor(private userService: UserService) { }

    ngOnInit() {
        if (this.playlist) {
            this.classes += ' track-song-container track-play-pause';
        }
    }

    clicked(index){
        this.buttonClicked.emit(index);
    }

    isFavorite(){
        return this.userService.isFavorite(this.track._id, 'track')
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
    selector: 'app-description-card',
    templateUrl: './description-card.component.html'
})
export class DescriptionCardComponent implements OnInit {

    @Input() item: any = {};
    @Input() type:string;
    @Input() edit: boolean = false;
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    constructor(private userService: UserService, 
                private playlistService: PlaylistService) {}    

    isFavorite(): boolean{
        return this.userService.isFavorite(this.item._id, this.type);
    }

    addFavorite(){
        this.userService.setFavorite(this.item._id, this.type).subscribe(
            res => { this.userService.set(res) }
        )
    }

    deletePlaylist(){
        this.playlistService.delete(this.item._id).subscribe(
            () =>  this.userService.get().subscribe( user => this.userService.set(user) )
        )
    }

    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-h bg-img';
    }

}

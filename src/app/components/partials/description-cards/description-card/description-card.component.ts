import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-description-card',
    templateUrl: './description-card.component.html'
})
export class DescriptionCardComponent implements OnInit {

    @Input() item: any = {};
    @Input() type:string;
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    constructor(private userService: UserService) { }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size);
        return elements[rand];
    }

    isFavorite(){
        return this.userService.isFavorite(this.item._id, this.type);
    }

    addFavorite(){
        this.userService.setFavorite(this.item._id, this.type).subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-h bg-img';

        if(this.type == "playlist"){
            const track = this.getRandom(this.item.tracks);
            this.item.image = track.image[track.image.length - 1];
        }
    }

}

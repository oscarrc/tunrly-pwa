import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-description-card',
    templateUrl: './description-card.component.html'
})
export class EventCardComponent implements OnInit {

    @Input() item: any = {};
    @Input() type:string;
    @Input() eventBorderRadiusClass = 'bg-img-radius-lg';

    constructor() { }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size);
        return elements[rand];
    }


    ngOnInit() {
        this.eventBorderRadiusClass = this.eventBorderRadiusClass + ' h-100 event event-h bg-img';

        if(this.type == "playlist"){
            const track = this.getRandom(this.item.tracks);
            this.item.image = track.image[track.image.length - 1];
        }
    }

}

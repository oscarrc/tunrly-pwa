import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-secondary-card',
    templateUrl: './secondary-card.component.html'
})
export class SecondaryCardComponent implements OnInit {

    @Input() item: any = {};
    @Input() imageBorderRadiusClass = 'card-img--radius-md';

    constructor() { }

    getBgColor(value:number){
        let r = value % 4;
        let g = (value / 4) % 4;
        let b = (value / 16) % 4;
        
        return ('#' + Math.floor(r * 255 / 3).toString(16) + Math.floor(g * 255 / 3).toString(16) + Math.floor(b * 255 / 3).toString(16));
    }

    ngOnInit() {
    }

}

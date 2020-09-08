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
        let hash = 0;
        let str = value.toString();

        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        let c = (hash & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
    
        return "#00000".substring(0, 7 - c.length) + c;
    }

    ngOnInit() {}

}

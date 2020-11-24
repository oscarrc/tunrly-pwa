import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-secondary-card',
    templateUrl: './secondary-card.component.html'
})
export class SecondaryCardComponent {

    @Input() item: any = {};
    @Input() type: string;
    @Input() imageBorderRadiusClass = 'card-img--radius-md';

    constructor() { }

    getRandom(elements: Array<any>):any{
        const size = elements.length;
        const rand = Math.floor(Math.random() * size);
        return elements[rand];
    }

}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nothing',
    templateUrl: './nothing.component.html'
})
export class NothingComponent {

    @Input() message: string;
    @Input() url: string;
    @Input() action: string;

    constructor() { }

}

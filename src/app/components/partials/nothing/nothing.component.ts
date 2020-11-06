import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nothing',
    templateUrl: './nothing.component.html'
})
export class NothingComponent {

    @Input() type: string;
    @Input() url: string;

    constructor() { }

}

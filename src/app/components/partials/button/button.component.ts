import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html'
})
export class ButtonComponent {

    @Input() loading: boolean = false;
    @Input() classes: string;
    @Input() type: string;
    @Input() text: string;

    constructor() { }

}

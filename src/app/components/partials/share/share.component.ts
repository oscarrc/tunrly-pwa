import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html'
})
export class ShareComponent {
    @Input() title:string;
    @Input() description:string;
    @Input() image:string;
    @Input() tags:string;

    show: boolean = false;

    constructor() { }

}

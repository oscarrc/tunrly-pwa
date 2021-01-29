import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-kofi',
    templateUrl: './kofi.component.html'
})
export class KofiComponent {

    @Input() background: string = "#753fdc";
    @Input() title: string = "menu.coffee";
    @Input() id: string = "oscarrc";
    
    url: string = "https://ko-fi.com/" + this.id;

    constructor() { }
}

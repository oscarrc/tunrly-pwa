import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-section',
    templateUrl: './menu-section.component.html'
})
export class MenuSectionComponent{

    @Input() menuItem: any = {};

    constructor() { }
}

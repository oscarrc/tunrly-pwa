import { Component, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html'
})
export class ShareComponent  extends SimpleModalComponent<any, any> {
    @Input() title:string;
    @Input() description:string;
    @Input() image:string;
    @Input() tags:string;
    
    show: boolean = false;

    constructor() {  super() }

}

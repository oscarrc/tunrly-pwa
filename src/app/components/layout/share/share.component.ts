import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
    url: string
    show: boolean = false;

    constructor( private router:Router) {  super() 
        this.url = this.router.url;
    }

}

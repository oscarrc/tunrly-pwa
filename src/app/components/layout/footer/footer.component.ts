import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    
    year: number = (new Date()).getFullYear();
    installPrompt:any = null;

    public footerButtons: any = [
        {
            classes: 'btn btn-success btn-air platform-btn',
            icon: 'ion-logo-android',
            subtitle: 'Android'
        },
        {
            classes: 'btn btn-info btn-air platform-btn',
            icon: 'ion-logo-windows',
            subtitle: 'Windows'
        }
    ];

    constructor() { }

    showPrompt(){
        if(this.installPrompt) this.installPrompt.prompt();
    }

    ngOnInit() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.installPrompt = e;
        });
    }

}

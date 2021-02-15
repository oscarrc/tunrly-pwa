import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstallService } from 'src/app/services/install.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    
    year: number = (new Date()).getFullYear();
    installButton: boolean = false;
    promptSubscription: Subscription;

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

    constructor(private installService: InstallService) { }

    showPrompt(){
        this.installService.showPrompt();
    }

    ngOnInit(){
        this.promptSubscription = this.installService.installPrompt.subscribe( (prompt) => {
            if(prompt) this.installButton = true;
            else this.installButton = false;
        })
    }

    ngOnDestroy(){
        this.promptSubscription?.unsubscribe();
    }
}

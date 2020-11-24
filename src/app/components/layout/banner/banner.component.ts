import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkinService } from 'src/app/services/skin.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit, OnDestroy {
    @Input() backgroundImage: String;
    @Input() blur: Boolean = false;
    
    bgSubscription: Subscription;

    constructor(private skinService: SkinService) {}

    getRandomBackground():string{
        const number = Math.floor(Math.random() * 6) + 1;
        return "assets/images/background/header-" + number + ".jpg";
    }

    ngOnInit() {   
        this.bgSubscription = this.skinService.bannerBg.subscribe((bg) => {           
            if(bg) {
                this.backgroundImage = bg;
            }
        });
        
        if(this.backgroundImage){
            this.skinService.background.emit(this.backgroundImage)
        }else{
            this.skinService.background.emit(this.getRandomBackground())
        }
    }

    ngOnDestroy() {
        this.bgSubscription.unsubscribe();
    }

}

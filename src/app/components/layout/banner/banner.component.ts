import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SkinService } from '../../../services/skin.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
    @Input() backgroundImage: String;
    @Input() blur: Boolean = false;
    
    bgSubscription: Subscription;

    constructor(private skinService: SkinService) {}

    getRandomBackground(){
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

}
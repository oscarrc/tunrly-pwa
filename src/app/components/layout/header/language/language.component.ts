import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html'
})
export class LanguageComponent extends SimpleModalComponent<any, any> implements OnInit, OnDestroy {
    private userSubscription: Subscription;
    lang:string;

    constructor(private userService: UserService, private translateService: TranslateService) {
        super();
    }

    setLanguage(lang){
        this.userService.update({language: lang}).subscribe(
            res => { 
                this.userService.set(res);
                this.translateService.use(this.lang);
            },
            err => {}
        )
    }

    ngOnInit() {
        this.userService.user.subscribe(
            user => { 
                this.lang = user.language 
                this.translateService.use(this.lang);
            }
        )
    }

    ngOnDestroy(){
        this.userSubscription?.unsubscribe();
    }

}

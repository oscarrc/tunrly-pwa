import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html'
})
export class LanguageComponent extends SimpleModalComponent<any, any> implements OnInit, OnDestroy {
    private userSubscription: Subscription;
    lang:string;
    loading: boolean = false

    constructor(private userService: UserService) {
        super();
    }

    setLanguage(){
        this.loading = true;
        this.userService.update({language: this.lang}).subscribe(
            res => { 
                this.userService.set(res);
            }
        ).add( () => {
            this.loading = false;
            this.close();
        })
    }

    ngOnInit() {
        this.userService.user.subscribe(
            user => { 
                this.lang = user.language
            }
        )
    }

    ngOnDestroy(){
        this.userSubscription?.unsubscribe();
    }

}

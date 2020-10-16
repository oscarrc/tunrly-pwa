import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-language',
    templateUrl: './language.component.html'
})
export class LanguageComponent extends SimpleModalComponent<any, any> implements OnInit {
    private userSubscription: Subscription;
    lang:string;

    constructor(private userService: UserService) {
        super();
    }

    setLanguage(lang){
        this.userService.update({language: lang}).subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    ngOnInit() {
        this.userService.user.subscribe(
            user => {this.lang = user.language}
        )
    }

}

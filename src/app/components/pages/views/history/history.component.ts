import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {

    songs: any = {};
    private userSubscription: any;

    constructor(private loadingService: LoadingService,
                private userService: UserService) { }

    clearHistory(){
        this.userService.update({history: []}).subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => { 
                this.songs = {
                    title: 'History',
                    subTitle: 'You recently listen',
                    list: user.history
                };
            }
        )
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }
}

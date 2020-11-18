import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-history',
    templateUrl: './history.component.html'
})
export class UserHistoryComponent implements OnInit, AfterViewInit, OnDestroy {

    tracks: any = {};
    page: number = 1;
    limit: number = 10;

    private userSubscription: any;

    constructor(private loadingService: LoadingService,
                private userService: UserService) { }

    nextPage(){
        const count = this.tracks.list.length;
        if((count / this.limit) > this.page){
            this.page++;
        }
    }

    prevPage(){
        if(this.page > 1){
            this.page--
        }
    }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => { 
                this.tracks = {
                    title: 'History',
                    subTitle: 'You recently listen',
                    list: user.history.reverse()
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

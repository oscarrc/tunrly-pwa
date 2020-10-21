import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {

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

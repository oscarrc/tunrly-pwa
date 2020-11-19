import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';

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
                private userService: UserService,
                private trackService: TrackService) { }

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

    getTracks(tracks){
        const offset = (this.page - 1) * this.limit;
        
        if(this.tracks.items.slice(offset, this.limit).length == 0 ){
            this.tracks.loading = true;

            this.trackService.getTracks( tracks.slice(offset, this.limit)).subscribe( tracks => {   
                this.tracks.items = this.tracks.items.concat(tracks);
            }).add( () => this.tracks.loading = false );
        }
    }

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => { 
                this.tracks = {
                    title: 'user.history.title',
                    subtitle: 'user.history.subtitle',
                    list: user.history.reverse(),
                    loading: true,
                    items: []
                };
                
                this.getTracks(this.tracks.list)
            }
        )
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription?.unsubscribe();
    }
}

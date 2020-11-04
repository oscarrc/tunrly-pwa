import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../../../services/loading.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements AfterViewInit, OnDestroy{
    private routeSubscription: Subscription;

    user:any;
    page = {
        tracks: 1,
        artists: 1,
        albums: 1,
        playlists: 1
    };
    limit:number = 10;
    loading:boolean = true;
    gridView:boolean = false;
    selected:string = "tracks"

    constructor(private route: ActivatedRoute, 
                private loadingService: LoadingService,
                private userService: UserService) { 
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.username) {
                this.getUser(param.username);
            }
        });
    }

    getUser(username){
        this.user = this.userService.get(username).subscribe(
            res => this.user = res
        ).add( () => this.loading = false )
    }

    nextPage(){
        this.page[this.selected] = this.page[this.selected] + 1;
    }

    prevPage(){
        this.page[this.selected] = this.page[this.selected] - 1;
    }

    addInPlayer(){}
   
    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }
}

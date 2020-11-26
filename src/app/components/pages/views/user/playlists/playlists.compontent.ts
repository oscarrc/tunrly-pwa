import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service'
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-user-playlists',
    templateUrl: './playlists.component.html'
})
export class UserPlaylistsComponent implements OnInit, AfterViewInit, OnDestroy {
    private userSubscription: Subscription;

    playlists: any = [];
    page: number = 1;
    limit: number = 8;
    loading: boolean = true;

    constructor(private loadingService: LoadingService,
                private userService: UserService) {}

    ngOnInit() {
        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.loading = false;
                this.playlists = user.playlists;
            }
        )
    }

    nextPage(){
        this.page = this.page + 1;
    }

    prevPage(){
        this.page = this.page - 1;
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SearchService } from '../../../../services/search.service';
import { LoadingService } from '../../../../services/loading.service';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit, OnDestroy{

    searchSubscription: Subscription;
    routeSubscription: Subscription;

    tracks: any = {};
    albums: any = {};
    artists: any = {};
    playlists: any = {};
    type: string = "";
    page: number = 1;
    limit: number = 12;
    gridView = false;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private searchService: SearchService) {
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.type = param.type;
                    });
                }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
    }

    prevPage(){
        this.page = this.page - 1;
    }

    ngOnInit() {
        this.searchSubscription = this.searchService.searchStatus.subscribe((value) => {
            this.tracks = value.tracks;
            this.albums = value.albums;
            this.artists = value.artists;
            this.playlists = value.playlists
        });
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
}

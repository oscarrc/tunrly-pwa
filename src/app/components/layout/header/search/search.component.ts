import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../../services/search.service';
import { Subscription } from 'rxjs';

//TODO content loader placeholder

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    searchSubscription: Subscription;
    tracks: any = {};
    albums: any = {};
    artists: any = {};
    playlists: any = {};
    page: number = 1;
    limit: number = 10;

    constructor(private router: Router,
                private searchService: SearchService) { }

    ngOnInit() {
        this.searchSubscription = this.searchService.searchStatus.subscribe((value) => {
            this.tracks = value.tracks;
            this.albums = value.albums;
            this.artists = value.artists;
            this.playlists = value.playlists
        });
    }

    goToPage(page) {
        this.searchService.hideSearchResult();
        page = 'search/' + page;        
        this.router.navigate([page]);
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }

}

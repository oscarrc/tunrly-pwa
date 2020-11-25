import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    searchSubscription: Subscription;
    statusSubscription: Subscription;
    tracks: any = {};
    albums: any = {};
    artists: any = {};
    playlists: any = {};
    page: number = 1;
    limit: number = 10;
    loading: boolean = false;

    constructor(private router: Router,
                private searchService: SearchService) { }

    ngOnInit() {
        this.searchSubscription = this.searchService.searchResults.subscribe((value) => {
            this.tracks = value.tracks;
            this.albums = value.albums;
            this.artists = value.artists;
            this.playlists = value.playlists
        });

        this.statusSubscription = this.searchService.searchStatus.subscribe((value) => {
            this.loading = value;
        })
    }

    goToPage(page) {
        this.searchService.hideSearchResult();
        page = 'search/' + page;        
        this.router.navigate([page]);
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
        this.statusSubscription.unsubscribe();
    }

}

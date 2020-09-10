import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../../../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

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
            console.log(value)
            this.tracks = value.tracks;
            this.albums = value.albums;
            this.artists = value.artists;
            this.playlists = value.playlists
        });
    }

    goToPage(page) {
        page = 'search/' + page;
        this.searchService.hideSearchResult();
        this.router.navigate([page]);
    }

}

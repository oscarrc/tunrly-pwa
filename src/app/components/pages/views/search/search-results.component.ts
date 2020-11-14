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
    statusSubscription: Subscription;

    results: any = {};
    loading: boolean = false;
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
        this.doSearch();
    }

    prevPage(){
        this.page = this.page - 1;
        this.doSearch();
    }

    doSearch(){
        this.searchService.status = true;

        this.searchService.doSearch(this.searchService.query, this.type, this.page, this.limit).subscribe(
            res => {
                this.results[this.type] = res;
            }
        ).add( () => {                
            this.searchService.status = false
        })
    }
    
    ngOnInit() {
        this.searchSubscription = this.searchService.searchResults.subscribe((value) => {
            this.results = value
        });

        this.statusSubscription = this.searchService.searchStatus.subscribe((value) => {
            this.loading = value;
        })
    }

    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
}

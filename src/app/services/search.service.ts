import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private search:any = [];
    private searchURL = environment.api + '/search/';
    private currentStatus = {
        query: '',
        loading: false
    }

    searchResults: BehaviorSubject<any> = new BehaviorSubject(this.search);
    searchStatus: BehaviorSubject<any> = new BehaviorSubject(this.currentStatus);
    hideSearch: EventEmitter<boolean> = new EventEmitter(false);

    constructor(private httpClient: HttpClient) {}

    get results() {
        return this.search;
    }

    set results(value) {
        this.search = value;
        this.searchResults.next(value);
    }

    set status(value) {
        this.currentStatus = value;
        this.searchStatus.next(value);
    }

    doSearch(query: string, type: string = "", page: number = 1, limit: number = 10){
        return this.httpClient.get(this.searchURL + type, { params: {
            query: query,
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    hideSearchResult() {
        this.hideSearch.emit(true);
    }
}

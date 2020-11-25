import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private search:any = {};
    private searchURL = environment.api + '/search/';
    private loading = false;
    private searchQuery = '';

    searchResults: BehaviorSubject<any> = new BehaviorSubject(this.search);
    searchStatus: BehaviorSubject<any> = new BehaviorSubject(this.loading);
    hideSearch: EventEmitter<boolean> = new EventEmitter(false);

    constructor(private httpClient: HttpClient) {}

    get query() {
        return this.searchQuery;
    }

    set query(value) {
        this.searchQuery = value;
    }

    set results(value) {
        this.search = value;
        this.searchResults.next(this.search);
    }

    set status(value) {
        this.loading = value;
        this.searchStatus.next(value);
    }

    doSearch(query: string = this.searchQuery, type: string = "", page: number = 1, limit: number = 10):Observable<Object>{
        return this.httpClient.get(this.searchURL, { params: {
            type: type,
            query: query,
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    hideSearchResult(){
        this.hideSearch.emit(true);
    }
}

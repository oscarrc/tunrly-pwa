import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private search:any = false;
    private searchURL = environment.api + '/search/';
    searchStatus: BehaviorSubject<any> = new BehaviorSubject(this.search);

    constructor(private httpClient: HttpClient) { }

    get searchResult() {
        return this.search;
    }

    set searchResult(value) {
        this.search = value;
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
        this.searchResult = true;
    }
}

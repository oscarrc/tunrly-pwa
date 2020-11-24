import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class TagService {
    private tagURL = environment.api + '/tag/';

    constructor(private httpClient: HttpClient) {
    }

    getTag(tag: string, type: string, page: number, limit: number):Observable<Object>{
        return this.httpClient.get(this.tagURL + tag, { params: {
            type: type,
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getTop(page: number, limit: number):Observable<any>{
        return this.httpClient.get(this.tagURL, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }
}

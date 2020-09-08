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

    getTop(page: number, limit: number){
        return this.httpClient.get(this.tagURL, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }
}

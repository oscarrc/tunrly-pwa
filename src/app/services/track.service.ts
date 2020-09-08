import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class TrackService {
    private trackUrl = environment.api + '/track/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string, artist: string){
        return this.httpClient.get(this.trackUrl + `${name}/${artist}`);
    }

    getLyrics(id: string){
        return this.httpClient.get(this.trackUrl + `${id}/lyrics`);
    }

    getSimilar(id: string){
        return this.httpClient.get(this.trackUrl + `${id}/similar`);
    }

    getSource(id: string){
        return this.httpClient.get(this.trackUrl + `${id}/source`);
    }

    getTop(country: string, page: number, limit: number){
        return this.httpClient.get(this.trackUrl + 'top', { params: {
            country: country,
            page: page.toString(),
            limit: limit.toString()
        }});
    }
}

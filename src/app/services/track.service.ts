import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class TrackService {
    private trackUrl = environment.api + '/track/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string, artist: string):Observable<Object>{
        return this.httpClient.get(this.trackUrl + `${name}/${artist}`);
    }

    getSimilar(id: string, page:number = 1, limit:number = 12):Observable<any>{
        return this.httpClient.get(this.trackUrl + `${id}/similar`, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getSource(id: string):Observable<Object>{
        return this.httpClient.get(this.trackUrl + `${id}/source`);
    }

    getTop(country: string, page: number = 1, limit: number = 12):Observable<any>{
        return this.httpClient.get(this.trackUrl + 'top', { params: {
            country: country,
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getTracks(ids):Observable<any>{
        return this.httpClient.get(this.trackUrl, { params: {
            ids: ids.join(',')
        }})
    }
}

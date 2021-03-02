import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class ArtistService {
    private artistURL = environment.api + '/artist/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string):Observable<Object>{
        return this.httpClient.get(this.artistURL + `${name}`);
    }

    getAlbums(id: string, page:number = 1, limit:number = 12):Observable<any>{
        return this.httpClient.get(this.artistURL + `${id}/albums`, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getSimilar(id: string, page:number = 1, limit:number = 12):Observable<any>{
        return this.httpClient.get(this.artistURL + `${id}/similar`, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getTracks(id: string, page:number = 1, limit:number = 12):Observable<any>{
        return this.httpClient.get(this.artistURL + `${id}/tracks`, { params: {
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getTop(country: string, page:number = 1, limit:number = 12):Observable<any>{
        return this.httpClient.get(this.artistURL + 'top', { params: {
            country: country,
            page: page.toString(),
            limit: limit.toString()
        }});
    }

    getArtists(ids):Observable<any>{
        return this.httpClient.get(this.artistURL, { params: {
            ids: ids.join(',')
        }})
    }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ArtistService {
    private artistURL = environment.api + '/artist/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string){
        return this.httpClient.get(this.artistURL + `${name}`);
    }

    getAlbums(id: string){
        return this.httpClient.get(this.artistURL + `${id}/albums`);
    }

    getSimilar(id: string){
        return this.httpClient.get(this.artistURL + `${id}/similar`);
    }

    getTracks(id: string){
        return this.httpClient.get(this.artistURL + `${id}/tracks`);
    }

    getTop(country: string, page: number, limit: number){
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

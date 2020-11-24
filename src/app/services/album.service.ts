import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class AlbumService {
    private albumURL = environment.api + '/album/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string, artist: string):Observable<Object>{
        return this.httpClient.get(this.albumURL + `${name}/${artist}`);
    }

    getAlbums(ids):Observable<any>{
        return this.httpClient.get(this.albumURL, { params: {
            ids: ids.join(',')
        }})
    }
}

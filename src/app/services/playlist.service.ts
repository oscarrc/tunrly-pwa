import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class PlaylistService {
    private playlistURL = environment.api + '/playlist/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(id: string):Observable<Object>{
        return this.httpClient.get(this.playlistURL + id);
    }

    get(user: string, page:number, limit:number):Observable<Object>{
        let params = {            
            page: page.toString(),
            limit: limit.toString()
        }

        if(user) params["user"] = user;

        return this.httpClient.get(this.playlistURL, { params: params });
    }

    create(playlist):Observable<Object>{
        return this.httpClient.post(this.playlistURL, playlist);
    }

    update(playlist, id):Observable<Object>{
        return this.httpClient.put(this.playlistURL + '/' + id, playlist);
    }

    delete(id):Observable<Object>{
        return this.httpClient.delete(this.playlistURL + '/' + id);
    }

    getPlaylists(ids):Observable<any>{
        return this.httpClient.get(this.playlistURL, { params: {
            ids: ids.join(',')
        }})
    }
}

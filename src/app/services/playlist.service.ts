import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PlaylistService {
    private playlistURL = environment.api + '/playlist/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(id: string){
        return this.httpClient.get(this.playlistURL + id);
    }

    get(user: string, page:number, limit:number){
        let params = {            
            page: page.toString(),
            limit: limit.toString()
        }

        if(user) params["user"] = user;

        return this.httpClient.get(this.playlistURL, { params: params });
    }

    delete(id){
        return this.httpClient.delete(this.playlistURL + '/' + id);
    }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

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

    create(playlist){
        return this.httpClient.post(this.playlistURL, playlist);
    }

    update(playlist){
        return this.httpClient.put(this.playlistURL, playlist);
    }

    delete(id){
        return this.httpClient.delete(this.playlistURL + '/' + id);
    }
}

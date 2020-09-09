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
}

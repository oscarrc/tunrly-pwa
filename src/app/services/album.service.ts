import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AlbumService {
    private albumURL = environment.api + '/album/';

    constructor(private httpClient: HttpClient) {
    }

    getInfo(name: string, artist: string){
        return this.httpClient.get(this.albumURL + `${name}/${artist}`);
    }
}

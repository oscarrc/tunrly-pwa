import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserService {
    private userURL = environment.api + '/user/';

    constructor(private httpClient: HttpClient) {
    }

    check(value){
        return this.httpClient.get(this.userURL  + '/check', { params: { value } });
    }

    get(){
        return this.httpClient.get(this.userURL); 
    }

    create(user: any){
        return this.httpClient.post(this.userURL, user);
    }

    update(user:any){
        return this.httpClient.put(this.userURL, user);
    }

    updatePassword(oldPassword: string, newPassword: string){
        return this.httpClient.patch(this.userURL + '/password', {oldPassword, newPassword});
    }

    setFavorite(favId: string, type: string){
        return this.httpClient.patch(this.userURL + '/favorites', {favId, type});
    }

    addToHistory(track: string){
        return this.httpClient.patch(this.userURL + '/history', { track });
    }
}

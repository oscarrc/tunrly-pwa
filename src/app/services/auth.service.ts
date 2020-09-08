import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/'
    private token:string;
    private session:string;

    constructor(private httpClient: HttpClient) {
    }

    login(email: string, password: string, remember: boolean, device: string):Observable<any> {
        return this.httpClient.post(this.authURL, { email: email, password: password, device:device });
    }

    logout(device: string){
        return this.httpClient.delete(this.authURL, { params: { device:device } });
    }

    refresh(user: string, token: string, device: string){
        return this.httpClient.patch(this.authURL, { user:user, token:token, device:device });
    }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable()
export class ValidationService {
    private validationURL = environment.api + '/validation/';
    
    constructor(private httpClient: HttpClient) {
        
    }

    create(user: string, action: number):Observable<Object>{
        return this.httpClient.post(this.validationURL, { user: user, action: action });
    }

    validate(token: string, action: number, password: string = null):Observable<Object>{
        return this.httpClient.patch(this.validationURL, { token: token, action: action, password: password });
    }
}

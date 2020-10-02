import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ValidationService {
    private validationURL = environment.api + '/validation/';
    
    constructor(private httpClient: HttpClient) {
        
    }

    create(email: string, action: number){
        return this.httpClient.post(this.validationURL, { email: email, action: action });
    }

    validate(token: string, action: number, password: string = null){
        return this.httpClient.patch(this.validationURL, { token: token, action: action, password: password });
    }
}

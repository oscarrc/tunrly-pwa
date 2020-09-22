import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/';
    private user:any;
    
    constructor(private httpClient: HttpClient,
                private cookieService: CookieService) {
    }

    login(email: string, password: string, remember: boolean, device: string){
        return this.httpClient.post(this.authURL, { email: email, password: password, device:device }).pipe(tap(
            res => {
                let date = new Date();

                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.cookieService.set("token", res['token'], 0, '/', null, true);
                this.cookieService.set("session", res['session'], remember ? date : 0, '/', null, true);

                return true;
            },
            err => {
                return err
            }
        ));
    }

    logout(device: string){
        return this.httpClient.delete(this.authURL, { params: { device:device } }).pipe(tap(
            res => {
                sessionStorage.removeItem('user');
                this.cookieService.delete("token");
                this.cookieService.delete("session");
                return true;
            },
            err => {
                return err
            }
        ));
    }

    refresh(user: string, token: string, device: string){
        return this.httpClient.patch(this.authURL, { user:user, token:token, device:device }).pipe(tap(
            res => {
                let date = new Date();

                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.cookieService.set("token", res['token'], 0, '/', null, true);
                this.cookieService.set("session", res['session']);

                return true;
            },
            err => {
                return err
            }
        ));
    }
}

import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/';
    private user:any;
    private isLoggedIn: boolean = false;
    
    constructor(private httpClient: HttpClient,
                private router: Router,
                private cookieService: CookieService) {
    }

    public get loggedIn(): boolean{
        return this.isLoggedIn;
    }

    login(user: string, password: string, remember: boolean, device: string){        
        return this.httpClient.post(this.authURL, { user: user, password: password, device:device }).pipe(tap(
            res => {                
                let date = new Date();
                
                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.user = res['user'];
                this.cookieService.set("token", res['token'], 0, '/', null, true);
                this.cookieService.set("device", device, remember ? date : 0, '/', null, true);
                this.cookieService.set("session", res['session'], remember ? date : 0, '/', null, true);

                this.isLoggedIn = true;

                return this.isLoggedIn;
            },
            err => {
                return err
            }
        )
           
        );
    }

    logout(device: string = this.user.device){
        return this.httpClient.delete(this.authURL, { params: { device:device } }).pipe(tap(
            res => {
                sessionStorage.removeItem('user');

                this.cookieService.delete("token");
                this.cookieService.delete("session");

                this.isLoggedIn = false;

                return !this.isLoggedIn;
            },
            err => {
                return err
            }
        ));
    }

    refresh(user: string, token: string, device: string = this.user.device){
        return this.httpClient.patch(this.authURL, { user:user, token:token, device:device }).pipe(tap(
            res => {
                let date = new Date();

                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.cookieService.set("token", res['token'], 0, '/', null, true);
                this.cookieService.set("session", res['session']);

                this.isLoggedIn = true;

                return this.isLoggedIn;
            },
            err => {
                this.isLoggedIn = false;

                return err
            }
        ));
    }
}

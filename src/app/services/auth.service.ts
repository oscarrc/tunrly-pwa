import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

import Fingerprint2 from '@fingerprintjs/fingerprintjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/';
    private domain = environment.domain == 'localhost' ? environment.domain : '.' + environment.domain;
    private fingerprint: string;
    private isLoggedIn: boolean = false;
    private cookieTTL: any = 0;

    constructor(private httpClient: HttpClient, private cookieService: CookieService, private userService: UserService, private router: Router ) {
        this.init();
    }

    private init(){
        Fingerprint2.getPromise().then( (components) => {
            let values = components.map( c => { return c.value })
            let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);         
            this.fingerprint =  fingerprint;
        })

        if(this.session && this.session !== ''){
            this.isLoggedIn = true; 
        }
    }

    get loggedIn(): boolean{
        return this.isLoggedIn;
    }

    get session(): string{
        return this.cookieService.get("session");
    }



    login(user: string, password: string, remember: boolean){        
        if(remember){
            let date = new Date();
            this.cookieTTL.setFullYear(date.getFullYear() + 1);
        }
        
        return this.httpClient.post(this.authURL, { user: user, password: password, device: this.fingerprint }).pipe(tap(
            res => {
                this.userService.set(res['user']);
                this.cookieService.set("uid", res['user']['_id'], 0, '/', this.domain);
                this.cookieService.set("token", res['token'], 0, '/', this.domain);
                this.cookieService.set("fingerprint", this.fingerprint, this.cookieTTL, '/', this.domain);
                this.cookieService.set("session", res['session'], this.cookieTTL, '/', this.domain);

                this.isLoggedIn = true;
                this.router.navigate(['/home']);

                return this.isLoggedIn;
            },
            err => {
                return err
            }
        ));
    }

    logout(device:boolean = true){
        const fingerprint = this.cookieService.get("fingerprint");

        return this.httpClient.delete(this.authURL, { params: device ? { device: fingerprint } : {} }).subscribe(
            res => {                
                return res["success"];
            },
            err => {
                return err
            }            
        ).add(() => {
            this.cookieService.delete('session');
            this.cookieService.delete('token');
            this.cookieService.delete('uid');             
            this.router.navigate(['/']);                             
            this.userService.set(null);
            this.isLoggedIn = false;   
        });
    }

    refresh(){
        const session = this.cookieService.getAll();

        return this.httpClient.patch(this.authURL, { user:session.uid, token:session.session, device: session.fingerprint }).pipe(tap(
            res => {
                let date = new Date();
               
                date.setFullYear(date.getFullYear() + 1);

                this.userService.set(res['user']);
                this.cookieService.set("token", res['token'], 0, '/', this.domain);
                this.cookieService.set("session", res['session'], this.cookieTTL, '/', this.domain);

                this.isLoggedIn = true;
                
                return res;
            },
            err => {
                this.isLoggedIn = false;
                this.cookieService.deleteAll();
                this.userService.set(null);
                return err
            }
        ));
    }
}

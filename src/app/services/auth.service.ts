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
    private fingerprint: string;
    private isLoggedIn: boolean = false;
    
    constructor(private httpClient: HttpClient, private cookieService: CookieService, private userService: UserService, private router: Router ) {
        this.init();
    }

    private init(){
        const user = JSON.parse(sessionStorage.getItem('user'));

        Fingerprint2.getPromise().then( (components) => {
            let values = components.map( c => { return c.value })
            let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);         
            this.fingerprint =  fingerprint;
        })

        if(this.session && this.session !== ''){
            this.isLoggedIn = true;
        }

        if(user){
            this.userService.set(user);
        }
    }

    get loggedIn(): boolean{
        return this.isLoggedIn;
    }

    get session(): string{
        return this.cookieService.get("session");
    }



    login(user: string, password: string, remember: boolean){
        return this.httpClient.post(this.authURL, { user: user, password: password, device: this.fingerprint }).pipe(tap(
            res => {
                let date = new Date();
                
                date.setFullYear(date.getFullYear() + 1);
                                
                this.userService.set(res['user']);
                this.cookieService.set("uid", res['user']['_id'], 0, '/');
                this.cookieService.set("token", res['token'], 0, '/');
                this.cookieService.set("fingerprint", this.fingerprint, remember ? date : 0, '/');
                this.cookieService.set("session", res['session'], remember ? date : 0, '/');

                this.isLoggedIn = true;
                this.router.navigate(['/home']);

                return this.isLoggedIn;
            },
            err => {
                return err
            }
        ));
    }

    logout(){
        const fingerprint = this.cookieService.get("fingerprint");

        return this.httpClient.delete(this.authURL, { params: { device: fingerprint } }).subscribe(
            res => {                
                return res["success"];
            },
            err => {
                return err
            },
            () => {                            
                this.userService.set(null);
                this.cookieService.deleteAll();
                this.isLoggedIn = false;                
                this.router.navigate(['/']);
            }
        );
    }

    refresh(){
        const session = this.cookieService.getAll();

        return this.httpClient.patch(this.authURL, { user:session.uid, token:session.session, device: session.fingerprint }).pipe(tap(
            res => {
                let date = new Date();
               
                date.setFullYear(date.getFullYear() + 1);

                this.userService.set(res['user']);
                this.cookieService.set("token", res['token'], 0, '/');
                this.cookieService.set("session", res['session']);

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

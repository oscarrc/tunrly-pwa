import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import Fingerprint2 from '@fingerprintjs/fingerprintjs';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/';
    private user:any;
    private fingerprint: string;
    private isLoggedIn: boolean = false;
    
    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
        Fingerprint2.getPromise().then( (components) => {
            let values = components.map( c => { return c.value })
            let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);         
            this.fingerprint =  fingerprint;
        })
    }

    public get loggedIn(): boolean{
        return this.isLoggedIn;
    }

    public get session(): string{
        return this.cookieService.get("session");
    }

    login(user: string, password: string, remember: boolean){
        return this.httpClient.post(this.authURL, { user: user, password: password, device: this.fingerprint }).pipe(tap(
            res => {                
                let date = new Date();
                
                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.user = res['user'];
                this.cookieService.set("uid", res['user']['_id'], 0, '/');
                this.cookieService.set("token", res['token'], 0, '/');
                this.cookieService.set("fingerprint", this.fingerprint, remember ? date : 0, '/');
                this.cookieService.set("session", res['session'], remember ? date : 0, '/');

                this.isLoggedIn = true;

                return this.isLoggedIn;
            },
            err => {
                return err
            }
        ));
    }

    logout(){
        const fingerprint = this.cookieService.get("fingerprint");

        sessionStorage.removeItem('user');
        this.cookieService.deleteAll();
        this.isLoggedIn = false;

        return this.httpClient.delete(this.authURL, { params: { device: fingerprint } }).subscribe(
            res => {                
                return res["success"];
            },
            err => {
                return err
            }
        );
    }

    refresh(){
        const session = this.cookieService.getAll();

        return this.httpClient.patch(this.authURL, { user:session.uid, token:session.session, device: session.fingerprint }).pipe(tap(
            res => {
                let date = new Date();
               
                date.setFullYear(date.getFullYear() + 1);
                sessionStorage.setItem('user', JSON.stringify(res['user']));

                this.user = res['user'];
                this.cookieService.set("token", res['token'], 0, '/');
                this.cookieService.set("session", res['session']);

                this.isLoggedIn = true;
                
                return res;
            },
            err => {
                this.isLoggedIn = false;
                this.cookieService.deleteAll();
                sessionStorage.removeItem('user');
                return err
            }
        ));
    }
}

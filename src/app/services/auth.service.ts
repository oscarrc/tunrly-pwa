import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import Fingerprint2 from '@fingerprintjs/fingerprintjs';

@Injectable()
export class AuthService {
    private authURL = environment.api + '/auth/';
    private domain = environment.domain == 'localhost' ? environment.domain : '.' + environment.domain;
    private loggedIn = new BehaviorSubject<boolean>(this.hasSession());
    private fingerprint:string;
    private cookieTTL:any = 0;

    isLoggedIn:Observable<boolean> = this.loggedIn.asObservable();

    constructor(private httpClient: HttpClient, 
                private cookieService: CookieService, 
                private userService: UserService, 
                private storageService: StorageService,
                private router: Router ) {
                    this.getFingerprint();
                }

    private getFingerprint(){
        Fingerprint2.getPromise().then( (components) => {
            let values = components.map( c => { return c.value })
            let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);         
            this.fingerprint = fingerprint;
        })
    }

    private hasSession():boolean{
        return !!this.cookieService.get("session");
    }

    private clear(){
        this.storageService.clearLocalStorage();     
        this.cookieService.deleteAll('/', this.domain);
        this.router.navigate(['/']);                             
        this.userService.set(null);
        this.loggedIn.next(false);  
    }

    get loginStatus(): boolean{
        return this.loggedIn.value && this.hasSession();
    }

    login(user: string, password: string, remember: boolean):Observable<Object>{        
        if(remember){
            this.cookieTTL = new Date();
            this.cookieTTL.setFullYear(this.cookieTTL.getFullYear() + 1);
        }
        
        return this.httpClient.post(this.authURL, { user: user, password: password, device: this.fingerprint }).pipe(tap(
            res => {
                this.userService.set(res['user']);
                this.cookieService.set("token", res['token'], 0, '/', this.domain);
                this.cookieService.set("uid", res['user']['_id'], this.cookieTTL, '/', this.domain);
                this.cookieService.set("fingerprint", this.fingerprint, this.cookieTTL, '/', this.domain);
                this.cookieService.set("session", res['session'], this.cookieTTL, '/', this.domain);
                this.loggedIn.next(true);
                this.router.navigate(['/home']);
            }
        ));
    }

    refresh():Observable<Object>{
        const session = this.cookieService.getAll();

        return this.httpClient.patch(this.authURL, { user:session.uid, token:session.session, device: session.fingerprint }).pipe(tap(
            res => {
                this.userService.set(res['user']);
                this.cookieService.set("token", res['token'], 0, '/', this.domain);
                this.cookieService.set("session", res['session'], this.cookieTTL, '/', this.domain);
                this.loggedIn.next(true);
            }
        ));
    }    

    logout(device:boolean = true):void{
        const fingerprint = this.cookieService.get("fingerprint");
        const token = this.cookieService.get("token");
        const session = this.cookieService.get("session");

        if(session && token){
            this.httpClient.delete(this.authURL, { params: device ? { device: fingerprint } : {} }).subscribe()
        }

        this.clear();
    }
}

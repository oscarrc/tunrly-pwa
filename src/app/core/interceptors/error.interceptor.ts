import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';

import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService, private jwtInterceptor: JwtInterceptor) { }

    private refreshing: Boolean = false;

    private handleError(){
        //TODO handle error with toast or something
    }

    private handleRefresh(){
        const refreshObservable = this.authService.refresh();
        const refreshSubject = new ReplaySubject<any>(1);

        refreshSubject.subscribe( () => { this.refreshing = false })
        refreshObservable.subscribe(refreshSubject);
        
        return refreshSubject;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        return next.handle(req).pipe(catchError((err:any) => {        
            switch(err.status){
                case 401:
                    if(this.authService.loggedIn && !this.refreshing){                                                        
                        this.refreshing = true;
                        return this.handleRefresh().pipe(mergeMap(() => {
                            return this.jwtInterceptor.intercept(req, next);
                        }))
                    }else{
                        this.refreshing = false;
                        this.router.navigate(['/']);
                        return throwError(err);
                    }
                case 403:
                    // this.router.navigate(['/home']);
                    return throwError(err);
                case 404:
                    this.router.navigate(['/404']);
                    return throwError(err);
                default:
                    this.handleError();
                    return throwError(err);
            }            
        }))
    }
}
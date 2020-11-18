import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, 
                private authService: AuthService,
                private jwtInterceptor: JwtInterceptor,
                private toastr: ToastrService) {}

    private refreshing: Boolean = false;
    private refreshObservable: Observable<any>;
    private refreshSubject: ReplaySubject<any>;

    private handleError(err){
        this.toastr.error(err.error.message, 'Error', { positionClass: this.authService.loginStatus ? 'toast-offset' : 'toast-position'});
    }

    private handleRefresh(){
        this.refreshing = true;
        this.refreshObservable = this.authService.refresh();
        this.refreshSubject = new ReplaySubject<any>(null);

        this.refreshObservable.subscribe(this.refreshSubject);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        return next.handle(req).pipe(catchError((err:any) => {        
            switch(err.status){
                case 401:
                    if(this.authService.loginStatus){
                        if (!this.refreshing) this.handleRefresh();

                        return this.refreshSubject.pipe(
                            filter( t => t !== null),
                            take(1),
                            switchMap(() => {                            
                                return this.jwtInterceptor.intercept(req, next).pipe(
                                    catchError( (err) => {
                                        this.authService.logout();
                                        return throwError(err);
                                    }),
                                );
                            })
                        )
                    }else{                        
                        this.authService.logout();
                        this.handleError(err);
                        return throwError(err);
                    }
                case 403:
                    this.handleError(err);
                    return throwError(err);
                case 404:
                    this.router.navigate(['/404']);
                    return throwError(err);
                default:
                    this.handleError(err);
                    return throwError(err);
            }            
        }))
    }
}
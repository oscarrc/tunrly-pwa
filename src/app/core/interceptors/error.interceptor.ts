import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, map, tap } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

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
        const position = this.authService.loginStatus || err.status !== 401 ? 'toast-offset' : 'toast-position';        
        let message = err.error?.message || 'Unexpected error';

        if(err.status == 401) this.authService.logout();

        switch(err.status){
            case 401:
                this.authService.logout();
                break;
            case 404:                
                this.router.navigate(['/404']);
                break;
            case 503:
                message = "Gateway timeout. Try again later."
                break;
        }
        
        this.toastr.error(message, 'Error', { positionClass: position });
    }

    private handleRefresh(){
        this.refreshing = true;
        this.refreshObservable = this.authService.refresh();
        this.refreshSubject = new ReplaySubject<any>(null);

        this.refreshObservable.subscribe(this.refreshSubject);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        return next.handle(req).pipe(catchError((err:any) => {        
            if(err.status == 401){
                if(this.authService.loginStatus){                        
                    if(err.error.name == "SessionExpired") this.handleError(err);
    
                    if (!this.refreshing) this.handleRefresh();
                    
                    return this.refreshSubject.pipe(
                        switchMap(() => {
                            this.refreshing = false;                     
                            return this.jwtInterceptor.intercept(req, next).pipe(
                                catchError( (err) => {
                                    this.handleError(err);
                                    return throwError(err);
                                }),
                            );
                        })
                    )
                }
            }

            this.handleError(err);
            return throwError(err);  
        }))
    }
}
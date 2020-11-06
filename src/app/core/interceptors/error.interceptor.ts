import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, ReplaySubject } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' }) 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, 
                private authService: AuthService,
                private jwtInterceptor: JwtInterceptor,
                private toastr: ToastrService) {}

    private refreshing: Boolean = false;

    private handleError(err){
        this.toastr.error(err.error.message, 'Error', { positionClass: this.authService.loggedIn ? 'toast-offset' : 'toast-position'});
    }

    private handleRefresh(){
        const refreshObservable = this.authService.refresh();
        const refreshSubject = new ReplaySubject<any>(1);

        refreshSubject.subscribe().add( () => { this.refreshing = false } );

        refreshObservable.subscribe(refreshSubject);
        
        return refreshSubject;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        return next.handle(req).pipe(catchError((err:any) => {        
            switch(err.status){
                case 401:
                    if(this.authService.loggedIn && !this.refreshing){                                                        
                        this.refreshing = true;

                        return this.handleRefresh().pipe(
                            mergeMap(() => {
                                return this.jwtInterceptor.intercept(req, next);
                            }),
                            catchError( err => {
                                this.router.navigate(['/']);
                                return throwError(err);
                            })
                        )
                    }else{
                        this.handleError(err)
                    }
                case 403:
                    this.handleError(err);
                case 404:
                    this.router.navigate(['/404']);
                default:
                    this.handleError(err);
            }            
        }))
    }
}
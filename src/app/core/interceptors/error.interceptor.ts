import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' }) 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) { }

    private handleRefresh(){
        // this.authService.logout();
        // location.reload(true);
    }

    private handleError(){
        //TODO handle error with toast or something
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //TODO see if its possible to renew the token before making the actual request

        return next.handle(request).pipe(catchError((err:any) => {            
            switch(err.status){
                case 404:
                    this.router.navigate(['/404']);
                    break;
                case 401:
                    this.handleRefresh();
                    break;
                case 403:
                    this.router.navigate(['/home']);
                    break;
                default:
                    this.handleError();
            }

            return throwError(err.error);
        }))
    }
}
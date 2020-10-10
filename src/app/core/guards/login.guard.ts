import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })

export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        const loggedIn = this.authService.loggedIn;

        if(!loggedIn){
            return true;
        }

        this.router.navigate(['/home']);   
        return false;
    }
}
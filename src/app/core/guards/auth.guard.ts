import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        const loggedIn = this.authService.loggedIn;
        const session = this.authService.session;

        if (loggedIn || session) {
            return true;
        }

        this.router.navigate(['/']);   
        return false;
    }
}
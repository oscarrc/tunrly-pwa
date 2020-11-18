import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })

export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        if(!this.authService.loginStatus) return true;
        this.router.navigate(['/home']);   
        return false;
    }
}
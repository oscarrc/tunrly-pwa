import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './views/landing/landing.component';
import { ErrorComponent } from './views/error/error.component';
import { ValidationComponent } from './views/validation/validation.component';

import { LoginGuard } from '../../core/guards/login.guard';

const routes: Routes = [
    {
        path: '',
        canActivate:[LoginGuard],
        component: LandingComponent
    },
    {
        path: '404',
        component: ErrorComponent
    },
    {
        path: 'validation/:action/:token',
        component: ValidationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }

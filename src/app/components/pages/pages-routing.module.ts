import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './views/landing/landing.component';
import { ErrorComponent } from './views/error/error.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: '404',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }

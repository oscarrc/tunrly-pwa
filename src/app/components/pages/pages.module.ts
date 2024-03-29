import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorComponent } from './views/error/error.component';
import { PoliciesComponent } from './views/policies/policies.component'
import { LayoutModule } from '../layout/layout.module';
import { PartialsModule } from '../partials/partials.module';
import { ComponentsModule } from './views/views.module';
import { CoreModule } from '../../core/core.module';
import { LandingComponent } from './views/landing/landing.component';
import { ValidationComponent } from './views/validation/validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        PagesComponent,
        ErrorComponent,
        PoliciesComponent,
        LandingComponent,
        ValidationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        PerfectScrollbarModule,
        SlickCarouselModule,
        LayoutModule,
        PartialsModule,
        ComponentsModule,
        CoreModule
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class PagesModule { }

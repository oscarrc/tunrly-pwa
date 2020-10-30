import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { LoadingService } from './services/loading.service';
import { MenuConfigService } from './services/menu.service';
import { AuthService } from './services/auth.service';

import {ErrorInterceptor} from './core/interceptors/error.interceptor'

export function jwtOptionsFactory(cookieService: CookieService) {
    return {
        tokenGetter: () => cookieService.get('token'),
        allowedDomains: ['localhost:3000','api.tunrly.com','dev.tunrly.com']
    };
}

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        LayoutModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [CookieService]
            }
        }),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
    ],
    providers: [
        LoadingService,
        MenuConfigService,
        AuthService,
        JwtInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

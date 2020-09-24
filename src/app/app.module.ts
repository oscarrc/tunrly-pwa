import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { LoadingService } from './services/loading.service';
import { MenuConfigService } from './services/menu-config.service';
import { SongsConfigService } from './services/songs-config.service';
import { AuthService } from './services/auth.service';

import {ErrorInterceptor} from './core/interceptors/error.interceptor'

export function jwtOptionsFactory(cookieService: CookieService) {
    return {
        tokenGetter: () => cookieService.get('token'),
        allowedDomains: ['localhost:3000'],
        // disallowedRoutes: ['http://localhost:3000/']
    };
}

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        LayoutModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [CookieService]
            }
          })
    ],
    providers: [
        LoadingService,
        MenuConfigService,
        SongsConfigService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

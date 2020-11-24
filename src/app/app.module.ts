import { BrowserModule, HammerModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule, JWT_OPTIONS, JwtInterceptor } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { LoadingService } from './services/loading.service';
import { MenuConfigService } from './services/menu.service';
import { AuthService } from './services/auth.service';

import {ErrorInterceptor} from './core/interceptors/error.interceptor';

import { environment } from '../environments/environment'

export function jwtOptionsFactory(cookieService: CookieService) {
    return {
        tokenGetter: () => cookieService.get('token'),
        allowedDomains: ['localhost:3000','api.tunrly.com','dev.tunrly.com']
    };
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        HammerModule,
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
            positionClass: 'toast-offset',
            preventDuplicates: true,
        }),
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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

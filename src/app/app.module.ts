import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { LoaderComponent } from './components/layout/loader/loader.component';
import { LoadingService } from './services/loading.service';
import { MenuConfigService } from './services/menu-config.service';
import { SongsConfigService } from './services/songs-config.service';

@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule
    ],
    providers: [
        LoadingService,
        MenuConfigService,
        SongsConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

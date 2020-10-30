import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryCardComponent } from './main-cards/primary-card/primary-card.component';
import { PrimaryCardLoaderComponent } from './main-cards/primary-card/loader/primary-card-loader.component';
import { SecondaryCardComponent } from './main-cards/secondary-card/secondary-card.component';
import { SecondaryCardLoaderComponent } from './main-cards/secondary-card/loader/secondary-card-loader.component';
import { DescriptionCardComponent } from './description-cards/description-card/description-card.component';
import { DescriptionCardLoaderComponent } from './description-cards/description-card/loader/description-card-loader.component';
import { EventCountdownCardComponent } from './description-cards/description-countdown-card/description-countdown-card.component';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { TrackListViewComponent } from './track-list-view/track-list-view.component';
import { TrackListViewLoaderComponent } from './track-list-view/loader/track-list-view-loader.component';
import { ButtonComponent } from './button/button.component';

import { TrackOptionsComponent } from './track-options/track-options.component';
import { TrackHorizontalComponent } from './track-horizontal/track-horizontal.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CommentComponent } from './comment/comment.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { CountdownComponent } from './countdown/countdown.component';
import { CoreModule } from 'src/app/core/core.module';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
    declarations: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        DescriptionCardComponent,
        EventCountdownCardComponent,
        TruncatePipe,
        TrackListViewComponent,
        TrackOptionsComponent,
        TrackHorizontalComponent,
        ImageCardComponent,
        PrimaryCardLoaderComponent,
        SecondaryCardLoaderComponent,
        DescriptionCardLoaderComponent,
        TrackListViewLoaderComponent,
        CommentComponent,
        ThemeSettingsComponent,
        CountdownComponent,
        ButtonComponent
    ],
    exports: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        DescriptionCardComponent,
        EventCountdownCardComponent,
        TrackListViewComponent,
        TrackOptionsComponent,
        TrackHorizontalComponent,
        ImageCardComponent,
        PrimaryCardLoaderComponent,
        SecondaryCardLoaderComponent,
        DescriptionCardLoaderComponent,
        TrackListViewLoaderComponent,
        CommentComponent,
        ThemeSettingsComponent,
        ButtonComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule,
        ContentLoaderModule
    ]
})
export class PartialsModule { }

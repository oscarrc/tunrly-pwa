import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PrimaryCardComponent } from './main-cards/primary-card/primary-card.component';
import { SecondaryCardComponent } from './main-cards/secondary-card/secondary-card.component';
import { EventCardComponent } from './description-cards/description-card/description-card.component';
import { EventCountdownCardComponent } from './description-cards/description-countdown-card/description-countdown-card.component';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { TrackListViewComponent } from './track-list-view/track-list-view.component';
import { SongOptionsComponent } from './song-options/song-options.component';
import { TrackHorizontalComponent } from './track-horizontal/track-horizontal.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { CommentComponent } from './comment/comment.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    declarations: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        EventCardComponent,
        EventCountdownCardComponent,
        TruncatePipe,
        TrackListViewComponent,
        SongOptionsComponent,
        TrackHorizontalComponent,
        ImageCardComponent,
        CommentComponent,
        ThemeSettingsComponent,
        CountdownComponent
    ],
    exports: [
        PrimaryCardComponent,
        SecondaryCardComponent,
        EventCardComponent,
        EventCountdownCardComponent,
        TrackListViewComponent,
        SongOptionsComponent,
        TrackHorizontalComponent,
        ImageCardComponent,
        CommentComponent,
        ThemeSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class PartialsModule { }

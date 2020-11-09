import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineTabsDirective } from './directives/line-tabs.directive';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LastPipe } from '../core/pipes/last.pipe';
import { RandomPipe } from '../core/pipes/random.pipe';
import { ToColorPipe } from '../core/pipes/toColor.pipe';
import { ToTimePipe } from '../core/pipes/toTime.pipe';
import { TruncatePipe } from '../core/pipes/truncate.pipe';

import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [CommonModule],
    declarations: [
        LastPipe,
        RandomPipe,
        ToColorPipe,
        ToTimePipe,
        TruncatePipe,
        LineTabsDirective
    ],
    exports: [
        LastPipe,
        RandomPipe,
        ToColorPipe,
        ToTimePipe,
        TruncatePipe,
        LineTabsDirective,
        TranslateModule
    ]
})
export class CoreModule { }

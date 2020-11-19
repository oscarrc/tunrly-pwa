import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineTabsDirective } from './directives/line-tabs.directive';
import { TargetBlankDirective } from './directives/target-blank.directive';

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
        LineTabsDirective,
        TargetBlankDirective
    ],
    exports: [
        LastPipe,
        RandomPipe,
        ToColorPipe,
        ToTimePipe,
        TruncatePipe,
        LineTabsDirective,
        TargetBlankDirective,
        TranslateModule
    ]
})
export class CoreModule { }

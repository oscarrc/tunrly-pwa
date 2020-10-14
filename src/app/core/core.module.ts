import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineTabsDirective } from './directives/line-tabs.directive';
import { ToColorPipe } from '../core/pipes/toColor.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ToColorPipe,
        LineTabsDirective
    ],
    exports: [
        ToColorPipe,
        LineTabsDirective
    ]
})
export class CoreModule { }

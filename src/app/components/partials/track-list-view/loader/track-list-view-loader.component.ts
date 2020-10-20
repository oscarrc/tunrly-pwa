import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-track-list-view-loader',
    templateUrl: './track-list-view-loader.component.html'
})
export class TrackListViewLoaderComponent {
    @Input() trackNumber: number;
    constructor() { }
}

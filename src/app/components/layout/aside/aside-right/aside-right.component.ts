import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';

import { AudioPlayerService } from '../../../../services/audio-player.service';
import { Subscription } from 'rxjs';

//TODO save and clear playlist
@Component({
    selector: 'app-aside-right',
    templateUrl: './aside-right.component.html'
})
export class AsideRightComponent implements OnInit, OnDestroy {

    @HostBinding('id') id = 'rightSidebar';

    playlist: any = {};
    nowPlaying: number = 0;

    private playlistSubscription: Subscription;
    private nowPlayingSubscription: Subscription;

    constructor(private audioPlayerService: AudioPlayerService) { }

    ngOnInit() {
        this.playlistSubscription = this.audioPlayerService.currentPlaylist.subscribe((playlist) => {
            this.playlist = playlist;
        });

        this.nowPlayingSubscription = this.audioPlayerService.playerOptions.subscribe((options) => {
            this.nowPlaying = options.index;
        });
    }

    ngOnDestroy() {
        this.playlistSubscription.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
    }

}

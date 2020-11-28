import { Component, HostBinding, OnDestroy, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-aside-right',
    templateUrl: './aside-right.component.html'
})
export class AsideRightComponent implements OnInit, OnDestroy {

    @HostBinding('id') id = 'rightSidebar';

    playlist: any = {};
    nowPlaying: number = 0;
    modified: boolean = false;    
    showPlaylist:string = 'open-right-sidebar';

    private playlistSubscription: Subscription;
    private nowPlayingSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private playerService: PlayerService) { }

    ngOnInit() {
        this.playlistSubscription = this.playerService.currentPlaylist.subscribe((playlist) => {
            this.playlist = playlist;        
        });

        this.nowPlayingSubscription = this.playerService.playerOptions.subscribe((options) => {
            this.nowPlaying = options.index;
            this.modified = options.modified;
        });
    }

    ngOnDestroy() {
        this.playlistSubscription.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
    }

    closePlaylist() {
        if (this.document.body.classList.contains(this.showPlaylist)) {
            this.document.body.classList.remove(this.showPlaylist);
        }
    }

    clearPlaylist(){
        this.playerService.clearPlaylist();
    }

    playTrack(index: number){
        this.playerService.playIndex(index);
    }

}

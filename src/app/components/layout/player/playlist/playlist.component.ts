import { Component, HostBinding, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnDestroy {

    @HostBinding('id') id = 'playerPlaylist';

    playlist: any = {};
    nowPlaying: number = 0;
    modified: boolean = false;    
    showPlaylist:string = 'open-playlist';

    private playlistSubscription: Subscription;
    private nowPlayingSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private playerService: PlayerService) {
                    this.nowPlaying = this.playerService.playerOptions.index;
                    this.playlistSubscription = this.playerService.currentPlaylist.subscribe((playlist) => {
                        this.playlist = playlist;      
                    });
            
                    this.nowPlayingSubscription = this.playerService.currentOptions.subscribe((options) => {
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

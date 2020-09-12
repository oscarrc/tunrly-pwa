import { Injectable, EventEmitter } from '@angular/core';
import * as Amplitude from 'amplitudejs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {
    private playlist: any = {
        tracks: []
    };

    nowPlaying: EventEmitter<any> = new EventEmitter();
    currentPlaylist: BehaviorSubject<any> = new BehaviorSubject(this.playlist);

    constructor() { }

    get trackIndex() {
        return this.nowPlaying;
    }

    set trackIndex(index) {
        this.nowPlaying.emit(index);
    }

    playTrack(track) {
        this.playlist.tracks.unshift(track);
        this.currentPlaylist.next(this.playlist);
        this.nowPlaying.emit(0);
        console.log(this.playlist)
    }

    addToPlaylist(track){
        this.playlist.tracks.push(track);
    }

    playNowPlaylist(playlist, index = 0) {
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);
        this.nowPlaying.emit(index);
    }
}

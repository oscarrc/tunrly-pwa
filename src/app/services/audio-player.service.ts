import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {
    private playlist: any = {
        tracks: []
    };
    //TODO format playlist according to model
    nowPlaying: EventEmitter<any> = new EventEmitter();
    currentPlaylist: BehaviorSubject<any> = new BehaviorSubject(this.playlist);

    constructor() { }

    get trackIndex() {
        return this.nowPlaying;
    }

    set trackIndex(index) {
        this.nowPlaying.emit(index);
    }

    getTrack(index){
        return this.playlist.tracks[index];
    }

    playTrack(track) {
        this.playlist.tracks.unshift(track);
        this.currentPlaylist.next(this.playlist);
        this.nowPlaying.emit(0);
    }

    playNext(index){
        if(this.playlist.tracks.length > index){
            this.nowPlaying.emit(index + 1)
        }
    }

    playPrev(index){
        if(index > 0 && this.playlist.tracks.length){
            this.nowPlaying.emit(index - 1)
        }
    }

    addToPlaylist(track){
        this.playlist.tracks.push(track);
    }

    playNowPlaylist(playlist, index = 0) {
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);
        this.nowPlaying.emit(index);
    }

    removeFromPlaylist(index){
        this.playlist = this.playlist.tracks.slice(index, 1);
        this.currentPlaylist.next(this.playlist);
    }
}

import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {
    private playlist: any = {
        tracks: []
    };

    private options: any = {
        index: 0,
        shuffle: false,
        repeat: false
    };

    //TODO  format playlist according to model for saving it
    //      clear playlist function
    playerOptions: EventEmitter<any> = new EventEmitter();
    currentPlaylist: BehaviorSubject<any> = new BehaviorSubject(this.playlist);

    constructor() { }

    get track(){
        return this.playlist.tracks[this.options.index];
    }

    playTrack(track) {
        this.playlist.tracks.unshift(track);
        this.currentPlaylist.next(this.playlist);
        this.options.index = 0;
        this.playerOptions.emit(this.options);
    }

    playNext(){
        let index = this.options.index;

        if(this.options.repeat && this.options.index == this.playlist.tracks.length - 1) index = -1;

        if(this.playlist.tracks.length > this.options.index){
            index = this.options.shuffle ?  Math.floor(Math.random()* this.playlist.tracks.length) : index + 1;
            this.options.index = index;
        }
        
        this.playerOptions.emit(this.options);
    }

    playPrev(){
        let index = this.options.index;

        if(this.options.repeat && index == 0 ) index = this.playlist.tracks.length;

        if(index > 0 && this.playlist.tracks.length){            
            index = this.options.shuffle ? Math.floor(Math.random()* this.playlist.tracks.length) : index - 1;
            this.options.index = index;
        }
       
        this.playerOptions.emit(this.options);
    }

    addToPlaylist(track){
        this.playlist.tracks.push(track);
    }

    playNowPlaylist(playlist) {
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);
        this.options.index = 0;
        this.playerOptions.emit(this.options);;
    }

    removeFromPlaylist(index){
        this.playlist = this.playlist.tracks.slice(index, 1);
        this.currentPlaylist.next(this.playlist);
    }

    setOption(option){
        this.options[option] = !this.options[option];
        this.playerOptions.emit(this.options);
    }
}

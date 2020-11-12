import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private playlist: any = {
        tracks: []
    };

    private options: any = {
        index: 0,
        shuffle: false,
        repeat: false,
        modified: false
    };

    playerOptions: EventEmitter<any> = new EventEmitter();
    currentPlaylist: BehaviorSubject<any> = new BehaviorSubject(this.playlist);

    constructor(private storageService: StorageService) {
        this.options = this.getOptions();
    }

    get track(){
        return this.playlist.tracks[this.options.index];
    }

    getOptions():any{
        const options = this.storageService.getLocalStorage('player');
        if(options) return options;
        return this.options;
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
        if(this.options.shuffle) index = Math.floor(Math.random()* this.playlist.tracks.length);
        if(this.playlist.tracks?.length > this.options.index) this.options.index = index++; 
        
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

    playIndex(index: number){
        this.options.index = index;
        this.playerOptions.emit(this.options);
    }

    addToPlaylist(track){
        this.options.modified = true;
        this.playlist.tracks.push(track);
        this.currentPlaylist.next(this.playlist);
        this.playerOptions.emit(this.options);
    }

    playNowPlaylist(playlist) {
        this.options.modified = false;
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);
        this.options.index = 0;
        this.playerOptions.emit(this.options);
    }

    removeFromPlaylist(index){
        this.playlist.tracks = this.playlist.tracks.splice(index, 1);
        this.currentPlaylist.next(this.playlist);
    }

    setOption(option){
        this.options[option] = !this.options[option];
        this.playerOptions.emit(this.options);
    }
}

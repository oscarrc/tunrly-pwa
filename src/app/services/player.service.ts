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

    playTrack(track){        
        this.playlist.tracks.unshift(track);
        this.currentPlaylist.next(this.playlist);
        this.options.index = 0;
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.playerOptions.emit(this.options);
    }

    playNext(){
        if(this.options.repeat && this.options.index == this.playlist.tracks.length - 1) this.options.index = -1;
        if(this.options.shuffle) this.options.index = Math.floor(Math.random()* this.playlist.tracks.length);
        if(this.playlist.tracks?.length > this.options.index) this.options.index += 1; 
        
        this.playerOptions.emit(this.options);
    }

    playPrev(){
        if(this.options.repeat && this.options.index == 0 ) this.options.index = this.playlist.tracks.length;

        if(this.options.index > 0 && this.playlist.tracks.length){            
            this.options.index = this.options.shuffle ? Math.floor(Math.random()* this.playlist.tracks.length) : this.options.index - 1;
        }
       
        this.playerOptions.emit(this.options);
    }

    playIndex(index: number){
        this.options.index = index;
        this.playerOptions.emit(this.options);
    }

    addToPlaylist(track){
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.playlist.tracks.push(track);
        this.currentPlaylist.next(this.playlist);
        this.playerOptions.emit(this.options);
    }

    playNowPlaylist(playlist){
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);
        this.options.index = 0;
        this.playerOptions.emit(this.options);
    }

    removeFromPlaylist(index){
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.playlist.tracks.splice(index, 1);
        this.currentPlaylist.next(this.playlist);
        this.playerOptions.emit(this.options);
    }

    clearPlaylist(){
        this.playlist = { tracks:[] };
        this.options.index = 0;
        this.options.modified = false;
        this.currentPlaylist.next(this.playlist);
        this.playerOptions.emit(this.options);
    }

    setOption(option){
        this.options[option] = !this.options[option];
        this.playerOptions.emit(this.options);
    }
}

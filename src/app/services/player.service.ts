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

    currentOptions: EventEmitter<any> = new EventEmitter();
    currentPlaylist: BehaviorSubject<any> = new BehaviorSubject(this.playlist);

    constructor(private storageService: StorageService) {
        this.options = this.storageService.getLocalStorage('player') || this.options;
        this.playlist = this.storageService.getLocalStorage("playlist") || this.playlist;        
        this.currentPlaylist.next(this.playlist);
    }

    get track(){
        return this.playlist.tracks[this.options.index];
    }

    get playerOptions():any{
        return this.options;
    }

    get playlistTracks():any{
        return this.playlist;
    }

    playTrack(track){        
        this.playlist.tracks.unshift(track);
        this.currentPlaylist.next(this.playlist);
        this.storageService.setLocalStorage('playlist', this.playlist);
        this.options.index = 0;
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }

    playNext(){
        if(this.options.shuffle) this.options.index = Math.floor(Math.random()* this.playlist.tracks.length);        
        if(this.options.index < this.playlist.tracks?.length - 1) this.options.index += 1;
        else if(this.options.repeat) this.options.index = 0;
             
        this.currentOptions.emit(this.options);
        this.storageService.setLocalStorage('player', this.options);
    }

    playPrev(){
        if(this.options.shuffle) this.options.index = Math.floor(Math.random()* this.playlist.tracks.length);
        if(this.options.index > 0) this.options.index -= 1;
        else if(this.options.repeat) this.options.index = this.playlist.tracks.length - 1;
        this.currentOptions.emit(this.options);
        this.storageService.setLocalStorage('player', this.options);
    }

    playIndex(index: number){
        this.options.index = index;
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }

    addToPlaylist(track){
        this.playlist.tracks.push(track);  
        this.currentPlaylist.next(this.playlist);
        this.storageService.setLocalStorage('playlist', this.playlist);
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }

    playNowPlaylist(playlist){
        this.playlist = playlist;
        this.currentPlaylist.next(this.playlist);   
        this.storageService.setLocalStorage('playlist', this.playlist);     
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.options.index = 0;
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }

    removeFromPlaylist(index){
        this.playlist.tracks.splice(index, 1);
        this.currentPlaylist.next(this.playlist);        
        this.storageService.setLocalStorage('playlist', this.playlist);
        this.options.modified = this.playlist.tracks.length > 1 ? true : false;
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }

    clearPlaylist(){
        this.playlist = { tracks:[] };
        this.options.index = 0;
        this.options.modified = false;
        this.currentPlaylist.next(this.playlist);
        this.currentOptions.emit(this.options);
        this.storageService.clearLocalStorage("playlist");
    }

    setOption(option){
        this.options[option] = !this.options[option];
        this.currentOptions.emit(this.options);        
        this.storageService.setLocalStorage('player', this.options);
    }
}

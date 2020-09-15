import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';


import { AudioPlayerService } from '../../../services/audio-player.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SkinService } from '../../../services/skin.service';
import { Config } from '../../../config/config';

//TODO Ability to make video bigger

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

    player: any;
    track: any = {};
    state: number = -1;
    time: number;
    buffered: number;
    duration: number;
    volume: number;  
    timer: any;
    seekTo: number = 0;
    volumeIcon = 'ion-md-volume-low';
    showPlaylist = 'open-right-sidebar';
    playerClass = 'player-primary';
    videoSize: number;
    videoOptions = {
        autoplay: 1,
        controls: 0
    };
    playerOptions = {
        index: 0,
        shuffle: false,
        repeat: false
    };
    
    skinSubscription: Subscription;
    playlistSubscription: Subscription;
    nowPlayingSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private localStorageService: LocalStorageService,
                private audioPlayerService: AudioPlayerService,
                private skinService: SkinService) { }

    ngOnInit() {
        this.init();

        const themeSkin = this.localStorageService.getThemeSkin();
        
        if (themeSkin) {
            this.playerClass = 'player-' + Config.THEME_CLASSES[themeSkin.player];
        }

        this.volume = parseInt((<HTMLInputElement>document.getElementById('volume')).value);

        this.nowPlayingSubscription = this.audioPlayerService.playerOptions.subscribe((options) => {            
            this.track = this.audioPlayerService.track;
            this.playerOptions = options;
        });

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.playerClass = 'player-' + Config.THEME_CLASSES[skin.player];
            }
        });
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
        clearInterval(this.timer);
    }

    init(){
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        this.videoSize = document.getElementById("audioPlayer").clientHeight;
    }

    ready(event){
        this.player = event.target;        
        this.duration = this.player.getDuration();
        this.player?.setVolume(this.volume);
        this.timer = setInterval( () => {
            this.time = this.player.getCurrentTime();
            this.buffered = this.player.getVideoLoadedFraction() * 100 || 0;
        })
    }

    stateChange(event){
        const state = event.data;

        this.state = state;

        switch(state){
            case -1: //No comenzado
                this.playPause();
                break;
            case 0: //Terminado
                this.playNext();
                break;
            case 1: //Reproduciondo
                break;
            case 2: //Pausa
                break;
            case 3: //Buffering
                break;
            case 5: //Encolado
                break;
        }
    }

    setVolume(event) {
        this.volume = event.target.value;
        
        if (this.volume < 1) {
            this.volumeIcon = 'ion-md-volume-mute';
        } else if (this.volume > 0 && this.volume < 70) {
            this.volumeIcon = 'ion-md-volume-low';
        } else if (this.volume > 70) {
            this.volumeIcon = 'ion-md-volume-high';
        }

        this.player?.setVolume(this.volume);
    }

    toggleOptions(option){
        this.audioPlayerService.setOption(option);
    }

    openPlaylist() {
        if (this.document.body.classList.contains(this.showPlaylist)) {
            this.document.body.classList.remove(this.showPlaylist);
        } else {
            this.document.body.classList.add(this.showPlaylist);
        }
    }

    playNext(){
        this.audioPlayerService.playNext();
    }

    playPrev(){
        this.audioPlayerService.playPrev();
    }

    seekStart(event){
        this.seekTo = event.target.value;
    }

    seekEnd(event){
        const time = (this.duration * event.target.value)/100;
        this.player?.seekTo(time, true);
        this.seekTo = 0;
    }

    playPause(){
        const state = this.player.getPlayerState();

        if(state == 1){            
            this.player.pauseVideo();
        }else{            
            this.player.playVideo();
        }
    }
}

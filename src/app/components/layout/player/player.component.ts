import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';


import { AudioPlayerService } from '../../../services/audio-player.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SkinService } from '../../../services/skin.service';
import { Config } from '../../../config/config';
;

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
    timer: any;
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

        this.nowPlayingSubscription = this.audioPlayerService.playerOptions.subscribe((options) => {            
            this.track = this.audioPlayerService.track;
            this.playerOptions = options;
            console.log(options);
        });

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.playerClass = 'player-' + Config.THEME_CLASSES[skin.player];
            }
        });
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
        const value = event.target.value;
        
        if (value < 1) {
            this.volumeIcon = 'ion-md-volume-mute';
        } else if (value > 0 && value < 70) {
            this.volumeIcon = 'ion-md-volume-low';
        } else if (value > 70) {
            this.volumeIcon = 'ion-md-volume-high';
        }

        this.player.setVolume(value);
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

    playPause(){
        const state = this.player.getPlayerState();

        if(state == 1){            
            this.player.pauseVideo();
        }else{            
            this.player.playVideo();
        }
    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
        clearInterval(this.timer);
    }

}

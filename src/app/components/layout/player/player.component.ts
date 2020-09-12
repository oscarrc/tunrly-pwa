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

    track: any = {};
    index: number = 0;
    volumeIcon = 'ion-md-volume-low';
    showPlaylist = 'open-right-sidebar';
    playerClass = 'player-primary';
    videoSize: number;
    repeat: boolean = false;
    shuffle: boolean = false;

    skinSubscription: Subscription;
    playlistSubscription: Subscription;
    nowPlayingSubscription: Subscription;

    constructor(@Inject(DOCUMENT) private document: Document,
                private localStorageService: LocalStorageService,
                private audioPlayerService: AudioPlayerService,
                private skinService: SkinService) { }

    ngOnInit() {
        this.initVideo();
       
        const themeSkin = this.localStorageService.getThemeSkin();
        
        if (themeSkin) {
            this.playerClass = 'player-' + Config.THEME_CLASSES[themeSkin.player];
        }

        this.nowPlayingSubscription = this.audioPlayerService.nowPlaying.subscribe((index) => {
            this.track = this.audioPlayerService.getTrack(index);
            this.index = index;
        });

        this.skinSubscription = this.skinService.themeSkin.subscribe((skin) => {
            if (skin) {
                this.playerClass = 'player-' + Config.THEME_CLASSES[skin.player];
            }
        });
    }

    initVideo(){
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        this.videoSize = document.getElementById("audioPlayer").clientHeight;
    }

    changeVolumeIcon(event) {
        const value = event.target.value;
        if (value < 1) {
            this.volumeIcon = 'ion-md-volume-mute';
        } else if (value > 0 && value < 70) {
            this.volumeIcon = 'ion-md-volume-low';
        } else if (value > 70) {
            this.volumeIcon = 'ion-md-volume-high';
        }
    }

    openPlaylist() {
        if (this.document.body.classList.contains(this.showPlaylist)) {
            this.document.body.classList.remove(this.showPlaylist);
        } else {
            this.document.body.classList.add(this.showPlaylist);
        }
    }

    playNext(){
        this.audioPlayerService.playNext(this.index);
    }

    playPrev(){
        this.audioPlayerService.playPrev(this.index);
    }

    playPause(){

    }

    ngOnDestroy() {
        this.skinSubscription.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
    }

}

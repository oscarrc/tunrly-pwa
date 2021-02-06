import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service'
import { UserService } from 'src/app/services/user.service';

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
    quality: number;  
    timer: any;
    seekTo: number = 0;
    volumeIcon = 'ion-md-volume-low';
    showPlaylist = 'show-playlist';
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
    qualityOptions:Array<string> = ["hd1080","hd720","large","medium"]
    
    skinSubscription: Subscription;
    playlistSubscription: Subscription;
    userSubscription: Subscription;
    nowPlayingSubscription: Subscription;
    
    // @ts-ignore 
    mediaSession = navigator.mediaSession;
    dummy = new Audio("assets/misc/silence.ogg");

    constructor(@Inject(DOCUMENT) private document: Document,
                private userService: UserService,
                private storageService: StorageService,
                private playerService: PlayerService) { 
                    this.playerOptions = this.playerService.getOptions();
                }

    ngOnInit() {
        this.init();
        this.initMediaSession();

        this.userSubscription = this.userService.user.subscribe(
            user => {
                this.volume = (user?.settings?.volume + 1)/3 * 75 || 100;
                this.quality = user?.settings?.quality;
            }
        )

        this.nowPlayingSubscription = this.playerService.playerOptions.subscribe((options) => {            
            this.track = this.playerService.track;            
            this.playerOptions = options;

            if(this.track){                
                this.setMediaSession();
                this.userService.addToHistory(this.track._id).subscribe(
                    res => this.userService.set(res)
                );
            }else{
                this.stop();
            }
        });        
    }

    ngOnDestroy() {
        this.skinSubscription?.unsubscribe();
        this.userSubscription?.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
        clearInterval(this.timer);
    }

    init(){
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        this.videoSize = document.getElementById("audioPlayer").clientHeight;        
        this.dummy.loop = true;
        this.dummy.volume = 0;   
    }

    ready(event){
        this.player = event.target;
        this.player?.setVolume(this.volume);        
        this.playPause();
    }

    stateChange(event){
        const state = event.data;

        this.state = state;

        switch(state){
            case -1: //Not started                
                this.clearInterval()
                this.playPause();
                break;
            case 0: //Finished;
                this.clearInterval();
                this.playNext();
                break;
            case 1: //Playing                
                this.duration = this.player.getDuration();
                this.timer = setInterval( () => {
                    if(!this.duration) this.clearInterval();
                    this.mediaSession.setPositionState({ duration: this.duration, playbackRate: 1, position: this.time });
                    this.time = this.player.getCurrentTime();
                    this.buffered = this.player.getVideoLoadedFraction() * 100 || 0;
                }, 1000);             
                break;
            case 2: //Pausa            
                this.clearInterval(false);
                break;
            case 3: //Buffering
                break;
            case 5: //Queued
                this.playPause();
                break;
        }
    }

    clearInterval(time = true){
        if(time) this.time = this.buffered = this.duration = this.state = 0;
        clearInterval(this.timer);
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
        this.playerService.setOption(option);
        this.storageService.setLocalStorage('player', this.playerOptions);
    }

    togglePlaylist() {        
        if(this.document.body.classList.contains(this.showPlaylist)){
            this.document.body.classList.remove(this.showPlaylist);
        }else{
            this.document.body.classList.add(this.showPlaylist);
        }
    }

    initMediaSession(){
        this.mediaSession.setActionHandler('play', this.playPause.bind(this));
        this.mediaSession.setActionHandler('pause', this.playPause.bind(this));
        this.mediaSession.setActionHandler('previoustrack', this.playPrev.bind(this));
        this.mediaSession.setActionHandler('nexttrack', this.playNext.bind(this));
        this.mediaSession.setActionHandler('seekto', this.doSeek.bind(this));
    }

    setMediaSession(){       
        // @ts-ignore 
        this.mediaSession.metadata = new MediaMetadata({
            title: this.track.name,
            artist: this.track.artist,
            album: this.track.album?.name,
            artwork: this.track.image.map( i => {
                let size = i.match(/\/i\/u\/(\d*)/g)[0].replace("/i/u/","");
                return {
                    src: i,   
                    sizes: size + 'x' + size,   
                    type: 'image/png'
                }
            })
        });
    }

    stop(){
        this.clearInterval();
        // @ts-ignore 
        this.mediaSession.metadata = new MediaMetadata({});        
        this.mediaSession.playbackState = "paused";
        this.dummy.pause(); 
    }

    playPause(){
        const state = this.player.getPlayerState();

        if(state == 1){        
            this.player.pauseVideo();
            this.dummy.play().then( () => {                
                this.dummy.pause();
            });            
            this.mediaSession.playbackState = "paused";
        }else{            
            this.dummy.pause();
            this.dummy.play();    
            this.player.playVideo();
            this.mediaSession.playbackState = "playing";
        }
    }

    playNext(){
        this.playerService.playNext();
    }

    playPrev(){
        this.playerService.playPrev();
    }

    doSeek(event){
        this.player?.seekTo(event.seekTime, true);
    }

    seekStart(event){
        this.seekTo = event.target.value;
    }
    seekEnd(event){        
        const time = (this.duration * event.target.value)/100;
        this.player?.seekTo(time, true);
        this.seekTo = 0;
    }
    
    jumpTo(event){
        this.seekStart(event);
        this.seekEnd(event);
    }

    onDestroy(){
        this.clearInterval();
    }
}

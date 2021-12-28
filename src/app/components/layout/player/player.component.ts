import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {
    //TODO background play
    //TODO Video not playing when not sourced and browser is minimized
    player: any;
    track: any = {};
    state: number = -1;
    time: number;
    buffered: number;
    duration: number;
    volume: number;
    quality: number;  
    timer: any;
    seekTime: number = 0;
    volumeIcon = 'ion-md-volume-low';
    showPlaylist = 'show-playlist';
    playerClass = 'player-primary';
    showVideo = 'show-video';
    videoSize: number;
    videoOptions = {
        autoplay: 0,
        controls: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        showinfo: 0
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
    interacted: Boolean = false;
    
    constructor(@Inject(DOCUMENT) public document: Document,
                private userService: UserService,
                private trackService: TrackService,
                private playerService: PlayerService) { 
                    this.playerOptions = this.playerService.playerOptions;                    
                    this.track = this.playerService.track;
                    this.interacted = false;
                    
                    this.userSubscription = this.userService.user.subscribe(
                        user => {
                            this.volume = (user?.settings?.volume + 1)/3 * 75 || 100;
                            this.quality = user?.settings?.quality;
                        }
                    )
            
                    this.nowPlayingSubscription = this.playerService.currentOptions.subscribe((options) => {
                        this.interacted = true;
                        this.track = this.playerService.track;        
                        this.playerOptions = options;
                        this.initTrack(this.track);
                    }); 
                }

    ngOnInit() {        
        this.initVisibilityHandler();
        this.initPlayer();
        this.initMediaSession(); 
        this.initTrack(this.track);
    }

    ngOnDestroy() {
        this.skinSubscription?.unsubscribe();
        this.userSubscription?.unsubscribe();
        this.nowPlayingSubscription.unsubscribe();
        this.stop();
    }

    initVisibilityHandler(){        
        Object.defineProperty(document, 'visibilityState', {value: 'visible', writable: true});
        Object.defineProperty(document, 'hidden', {value: false, writable: true});
        document.dispatchEvent(new Event("visibilitychange"));

        for (let event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
            window.addEventListener(event_name, (event) => {
                  event.stopImmediatePropagation();
            }, true);
        }  
    }

    initTrack(track){
        if(track && !track?.source)
            this.trackService.getSource(this.track._id).subscribe( s => this.track.source = s["source"]);

        if(track){
            this.setMediaSession();
            this.userService.addToHistory(this.track._id).subscribe(
                res => this.userService.set(res)
            );
        }else{
            this.stop()
        }
    }

    initPlayer(){
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        this.videoSize = document.getElementById("audioPlayer").clientHeight;        
        this.dummy.loop = true;
        this.dummy.volume = 0;   
    }

    initMediaSession(){
        this.mediaSession.setActionHandler('play', this.playPause.bind(this));
        this.mediaSession.setActionHandler('pause', this.playPause.bind(this));
        this.mediaSession.setActionHandler('previoustrack', this.playPrev.bind(this));
        this.mediaSession.setActionHandler('nexttrack', this.playNext.bind(this));
        this.mediaSession.setActionHandler('seekto', this.seekTo.bind(this));
    }

    ready(event){
        this.player = event.target;
        this.player?.setVolume(this.volume);        
        this.playPause();
    }

    stateChange(event){
        const state = event.data;
        this.state = state;
        console.log(state);

        switch(state){
            case -1: //Not started
                this.playPause();
                break;
            case 0: //Finished;
                clearInterval(this.timer);
                this.playNext();
                break;
            case 1: //Playing              
                this.duration = this.player.getDuration();
                this.timer = setInterval( () => {
                    this.time = this.player.getCurrentTime();
                    this.buffered = this.player.getVideoLoadedFraction() * 100 || 0;
                    this.mediaSession.setPositionState({ 
                        duration: this.duration, 
                        playbackRate: 1, 
                        position: this.duration >= this.time ? this.time : 0
                    });
                }, 500);             
                break;
            case 2: //Pause 
                clearInterval(this.timer);
                this.dummy.play().then( () => {
                    this.dummy.pause();
                    this.mediaSession.playbackState = "paused";
                }).catch();
                break;
            case 3: //Buffering       
                this.playPause();               
                break;
            case 5: //Queued      
                this.playPause();
                break;
        }
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

    setVolume(event) {
        this.volume = event.target.value;
        
        if (this.volume < 1)  this.volumeIcon = 'ion-md-volume-mute';
        else if (this.volume > 0 && this.volume < 70) this.volumeIcon = 'ion-md-volume-low';
        else if (this.volume > 70) this.volumeIcon = 'ion-md-volume-high';

        this.player?.setVolume(this.volume);
    }

    toggleOptions(option){
        this.playerService.setOption(option);
    }

    togglePlaylist() {  
        if(this.document.body.classList.contains(this.showVideo)) this.toggleVideo();          
        if(this.document.body.classList.contains(this.showPlaylist)) this.document.body.classList.remove(this.showPlaylist);
        else this.document.body.classList.add(this.showPlaylist);
    }

    toggleVideo() {     
        if(this.document.body.classList.contains(this.showPlaylist)) this.togglePlaylist();  
        if(this.document.body.classList.contains(this.showVideo)) this.document.body.classList.remove(this.showVideo);
        else this.document.body.classList.add(this.showVideo);
    }

    playPause(){
        if(this.state == 1) this.player.pauseVideo();
        else if(this.interacted) this.dummy.play().then( () => {            
            this.mediaSession.playbackState = "playing";
            this.player.playVideo();
        }).catch()
    }

    playNext(){
        this.stop();
        this.playerService.playNext();
    }

    playPrev(){
        this.stop();
        this.playerService.playPrev();
    }

    seekTo(event){
        this.player?.seekTo(event.seekTime, true);
    }

    seekStart(event){
        this.seekTime = event.target.value;
    }

    seekEnd(event){        
        const time = (this.duration * event.target.value)/100;
        this.player?.seekTo(time, true);
        this.seekTime = 0;
    }
    
    jumpTo(event){
        this.seekStart(event);
        this.seekEnd(event);
    }
    
    stop(){
        clearInterval(this.timer);        
        // @ts-ignore 
        this.mediaSession.metadata = new MediaMetadata({});     
        this.dummy.play().then(() => {
            this.dummy.pause() 
            this.player.stopVideo();
        });   
        this.mediaSession.playbackState = "paused";
        this.state = - 1;
        this.time = 0;
        this.duration = 0;
        this.buffered = 0;
    }
}

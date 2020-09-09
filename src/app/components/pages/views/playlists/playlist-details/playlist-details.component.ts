import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { AudioPlayerService } from '../../../../../services/audio-player.service';
import { PlaylistService } from '../../../../../services/playlist.service';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html'
})
export class PlaylistDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    playlistImage: string;
    playlistId: string;
    imageSrc: string;
    playlistDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private loadingService: LoadingService,
        private audioPlayerService: AudioPlayerService,
        private playlistService: PlaylistService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.playlistId = param.id;
                this.getPlaylistDetails();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getRandom(elements: Array<any>){
        const size = elements.length;
        const rand = Math.floor(Math.random() * size);
        return elements[rand];
    }

    // Initialize static data for display
    getPlaylistDetails() {
        this.playlistService.getInfo(this.playlistId).subscribe(
            res => {                 
                if(!res["image"]){                    
                    const track = this.getRandom(res["tracks"]);
                    res["image"] = track.image[track.image.length - 1];
                }

                this.playlistDetails = res;  
            },
            err => console.log(err)
        )
    }
   
    playAllSongs() {
        this.audioPlayerService.playNowPlaylist(this.playlistDetails.tracks);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

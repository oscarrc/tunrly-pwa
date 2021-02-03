import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserService } from 'src/app/services/user.service';

import { ShareComponent } from 'src/app/components/layout/share/share.component';

@Component({
    selector: 'app-playlist-details',
    templateUrl: './playlist-details.component.html'
})
export class PlaylistDetailsComponent implements AfterViewInit, OnDestroy {
    playlistImage: string;
    playlistId: string;
    imageSrc: string;
    playlistDetails: any = {};
    loading: boolean = false;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private simpleModalService: SimpleModalService,
        private loadingService: LoadingService,
        private playerService: PlayerService,
        private playlistService: PlaylistService,
        private userService: UserService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.playlistId = param.id;
                this.getPlaylistDetails();
            }
        });
    }
 
    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    addFavorite() {
        this.userService.setFavorite(this.playlistDetails._id, 'playlist').subscribe(
            res => { this.userService.set(res) },
            err => {}
        )
    }

    isFavorite():boolean{
        return this.playlistDetails?._id ? this.userService.isFavorite(this.playlistDetails._id, 'playlist') : false;
    }
    
    getPlaylistDetails() {
        this.loading = true;
        
        this.playlistService.getInfo(this.playlistId).subscribe(
            res => this.playlistDetails = res
        ).add( () => this.loading = false )
    }
   
    playAllSongs() {
        this.playerService.playNowPlaylist(this.playlistDetails);
    }

    doShare(){
        this.simpleModalService.addModal(ShareComponent, { 
            title: this.playlistDetails?.name + ' music',
            description: this.playlistDetails?.description,
            image: this.playlistDetails?.image,
            tags: this.playlistDetails?.tags.map( t => t.replace(/( |-)/gi, '')).join(',')
         });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

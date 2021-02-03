import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';

import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';
import { AlbumService } from 'src/app/services/album.service';
import { UserService } from 'src/app/services/user.service';

import { ShareComponent } from 'src/app/components/layout/share/share.component';

@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html'
})
export class AlbumDetailsComponent implements AfterViewInit, OnDestroy {

    albumName: string;
    artistName: string;
    artistDetails: any;
    albumDetails: any;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private simpleModalService: SimpleModalService,
                private loadingService: LoadingService,
                private playerService: PlayerService,
                private albumService: AlbumService,
                private userService: UserService) {
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param) {
                this.albumName = param.name;
                this.artistName = param.artist;
                this.getAlbumDetails();
            }
        });
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    addFavorite() {
        this.userService.setFavorite(this.albumDetails._id, 'album').subscribe(
            res => this.userService.set(res) 
        )
    }

    isFavorite():boolean{
        return this.userService.isFavorite(this.albumDetails?._id, 'album');
    }

    getAlbumDetails() {
        this.albumService.getInfo(this.albumName, this.artistName).subscribe(
            res => this.albumDetails = res
        )
    }
   
    playAllSongs() {
        this.playerService.playNowPlaylist(this.albumDetails);
    }

    doShare(){
        this.simpleModalService.addModal(ShareComponent, { 
            title: this.albumDetails?.name + ' by ' + this.albumDetails?.artist,
            description: 'Listen to ' + this.albumDetails?.name + ' by ' + this.albumDetails?.artist,
            image: this.albumDetails?.image[this.albumDetails?.image.length - 1],
            tags: this.albumDetails?.tags.map( t => t.replace(/( |-)/gi, '')).join(',')
         });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}

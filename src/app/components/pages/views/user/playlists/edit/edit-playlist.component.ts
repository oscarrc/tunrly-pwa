import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingService } from '../../../../../../services/loading.service';
import { PlaylistService } from '../../../../../../services/playlist.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-playlist',
    templateUrl: './edit-playlist.component.html'
})
export class EditPlaylistComponent implements OnDestroy{
    playlistId: string;
    playlistForm: any;
    playlist: any;
    formSubmitted: boolean = false;

    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private loadingService: LoadingService, private playlistService: PlaylistService) { 
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.playlistId = param.id;
                this.getPlaylistDetails();
            }
        });
    }

    getPlaylistDetails(){
        this.playlistService.getInfo(this.playlistId).subscribe( 
            playlist => {
                this.loadingService.stopLoading();
                this.playlist = playlist;
                this.initForm();
            }
        )
    }

    savePlaylist(playlist){
        this.formSubmitted = true;

        if (this.playlistForm.invalid) {
            return false;
        }

        playlist = playlist.value;

        playlist.image = playlist.image || this.playlist.image;
        playlist.tracks = this.playlist.tracks;

        this.playlistService.update(playlist).subscribe(
            () => this.router.navigate(['/user/playlists'])
        )
    }

    removeFromPlaylist(number){
        this.playlist.tracks.splice(number - 1, 1);
    }

    initForm(){
        this.playlistForm = new FormGroup({
            name: new FormControl(this.playlist.name, [
                Validators.required
            ]),
            description: new FormControl(this.playlist.description, [
                Validators.required
            ]),
            image: new FormControl(this.playlist.image),
            public: new FormControl(this.playlist.public),
        })
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

}

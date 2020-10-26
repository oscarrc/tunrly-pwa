import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingService } from '../../../../../../services/loading.service';
import { PlaylistService } from '../../../../../../services/playlist.service';
import { PlayerService } from '../../../../../../services/player.service';
import { Subscription } from 'rxjs';

import { FileValidator } from '../../../../../../core/validators/file.validator';

@Component({
    selector: 'app-edit-playlist',
    templateUrl: './edit-playlist.component.html'
})
export class EditPlaylistComponent implements OnDestroy{
    playlistId: string;
    playlistForm: any;
    playlist: any;
    formSubmitted: boolean = false;
    files: FileList;
    playlistSubscription: Subscription
    
    private routeSubscription: Subscription;

    //TODO playlists tags

    constructor(private route: ActivatedRoute, 
                private router: Router, 
                private loadingService: LoadingService, 
                private playlistService: PlaylistService, 
                private playerService: PlayerService) { 
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.id) {
                this.playlistId = param.id;
                this.getPlaylistDetails();
            }else{
                this.initNewPlaylist();
            }
        });
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

    initNewPlaylist(){
        this.playlistSubscription = this.playerService.currentPlaylist.subscribe(playlist => {
            this.playlist = {
                tracks: playlist?.tracks,
                name: playlist?.name,
            }
        });
        
        this.loadingService.stopLoading();
        this.initForm();
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

    imageToBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });        
    }

    removeFromPlaylist(number){
        this.playlist.tracks.splice(number - 1, 1);
    }

    onFile(files: FileList){
        this.files = files;
        this.playlistForm.get('image').setValidators([
            FileValidator.fileExtensions(['png', 'jpg']),
            FileValidator.maxFileSize(this.files, 1024)
        ]);
        this.playlistForm.get('image').updateValueAndValidity();
    }

    async savePlaylist(playlist){
        this.formSubmitted = true;

        if (this.playlistForm.invalid) {
            return false;
        }
        
        playlist = playlist.value;

        if(playlist.image){
           playlist.image = await this.imageToBase64(this.files[0]);
        }

        playlist.tracks = this.playlist.tracks;

        if(this.playlistId){
            this.playlistService.update(playlist).subscribe(
                () => this.router.navigate(['/user/playlists'])
            )
        }else{
            this.playlistService.create(playlist).subscribe(
                () => this.router.navigate(['/user/playlists'])
            )
        }
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

}

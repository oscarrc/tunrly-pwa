import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingService } from 'src/app/services/loading.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { PlayerService } from 'src/app/services/player.service';
import { Subscription } from 'rxjs';

import { FileValidator } from 'src/app/core/validators/file.validator';
import { ToastrService } from 'ngx-toastr';

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
    playlistSubscription: Subscription;
    loading: boolean = false;
    
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, 
                private router: Router, 
                private loadingService: LoadingService,
                private playlistService: PlaylistService, 
                private playerService: PlayerService,
                private toastr: ToastrService) { 
                    this.loadingService.startLoading();
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
            tags: new FormControl(this.playlist.tags ? this.playlist.tags.toString() : '', [
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
            
            this.loadingService.stopLoading();  
            this.initForm();
        });     
    }

    getPlaylistDetails(){
        this.playlistService.getInfo(this.playlistId).subscribe( 
            playlist => {
                this.playlist = playlist;
                this.loadingService.stopLoading();
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

        this.loading = true;

        playlist = playlist.value;
        playlist.tracks = this.playlist.tracks.map( t => t._id);
        playlist.tags = playlist.tags.split(',').map( t => t.trim() )

        if(playlist.image && this.files) playlist.image = await this.imageToBase64(this.files[0]);
       
        if(this.playlistId){
            this.playlistService.update(playlist, this.playlistId).subscribe(
                () => {
                    this.toastr.success("Playlist updated", "OK");
                    this.router.navigate(['/user/playlists']);
                }
            ).add( () => this.loading = false )
        }else{
            this.playlistService.create(playlist).subscribe(
                () => {
                    this.toastr.success("Playlist saved", "OK");
                    this.router.navigate(['/user/playlists']);
                }
            ).add( () => this.loading = false )
        }
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

}

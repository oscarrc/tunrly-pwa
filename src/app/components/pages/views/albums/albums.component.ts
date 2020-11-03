import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../services/loading.service';
import { ArtistService } from '../../../../services/artist.service';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html'
})
export class AlbumsComponent implements OnInit, AfterViewInit, OnDestroy {

    albums: any = [];
    id: string = '';
    type: string='';
    loading: boolean = true;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private artistService: ArtistService) {
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.type = this.route.snapshot.url[2]?.path;
                        this.id = param.id;
                        this.getContent();
                    });
                }

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    getContent(){
        this.loading = true;

        switch(this.type){
            case "albums":
                this.getArtistAlbums();
                break;
            default:
                break;
        }
    }

    getArtistAlbums() {
        this.artistService.getAlbums(this.id).subscribe(
            res => {
                    this.loading = false;
                    this.albums = res;
                },
            err => console.log(err)
        )
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

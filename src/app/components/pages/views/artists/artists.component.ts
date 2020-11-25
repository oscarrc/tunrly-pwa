import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})

export class ArtistsComponent implements AfterViewInit, OnDestroy {

    artists: any = [];
    country: string = '';
    id: string = '';
    type: string='';
    page: number = 1;
    limit: number = 12;
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

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
        this.getContent();
    }

    prevPage(){
        this.page = this.page - 1;
        this.getContent();
    }

    getContent(){
        this.loading = true;

        switch(this.type){
            case "similar":
                this.getSimilar();
                break;
            default:
                this.getArtists();
                break;
        }
    }

    getArtists() {
        this.artistService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.artists = res
        ).add(() => this.loading = false)
    }

    getSimilar() {
        this.artistService.getSimilar(this.id, this.page, this.limit).subscribe(
            res =>  this.artists = res
        ).add(() => this.loading = false)
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../services/loading.service';
import { ArtistService } from '../../../../services/artist.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})
//TODO paginate similar
export class ArtistsComponent implements OnInit, AfterViewInit, OnDestroy {

    artists: any = [];
    country: string = '';
    id: string = '';
    type: string='';
    page: number = 1;
    limit: number = 10;
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

    ngOnInit() {
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
            res => {
                this.loading = false;
                this.artists = res
            },
            err => console.log(err)
        )
    }

    getSimilar() {
        this.artistService.getSimilar(this.id).subscribe(
            res => {
                this.loading = false;
                this.artists = res;
            },
            err => console.log(err)
        )
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}

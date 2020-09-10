import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../services/loading.service';
import { ArtistService } from '../../../../services/artist.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})
//TODO paginate similar
export class ArtistsComponent implements OnInit, AfterViewInit {

    artists: any = [];
    country: string = '';
    name: string = '';
    id: string = '';
    page: number = 1;
    limit: number = 10;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private artistService: ArtistService) {
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.id = param.id;       
                        this.name = param.name;
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
        if(this.id){
            this.getSimilar()
        }else if(this.name){
            this.getArtists()
        }
    }

    getArtists() {
        this.artistService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.artists = res,
            err => console.log(err)
        )
    }

    getSimilar() {
        this.artistService.getSimilar(this.id).subscribe(
            res => this.artists = res,
            err => console.log(err)
        )
    }

}

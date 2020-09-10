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
                        let similar = route.snapshot.url.some( s => { return s.path == "similar" });

                        if (param.id && similar) {
                            this.id = param.id;
                            this.initSimilar();
                        }else if(param.name){         
                            this.name = param.name;              
                            this.initArtists();
                        }
                    });
                }

    ngOnInit() {
    }
    
    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
        this.initArtists();
    }

    prevPage(){
        this.page = this.page - 1;
        this.initArtists();
    }

    initArtists() {
        this.artistService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.artists = res,
            err => console.log(err)
        )
    }

    initSimilar() {
        this.artistService.getSimilar(this.id).subscribe(
            res => this.artists = res,
            err => console.log(err)
        )
    }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { ArtistService } from '../../../../services/artist.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit, AfterViewInit {

    artists: any = [];
    country: string = '';
    page: number = 1;
    limit: number = 10;

    constructor(private loadingService: LoadingService,
                private artistService: ArtistService) {}

    ngOnInit() {
        this.initArtists();
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

    // Initialize songs
    initArtists() {
        this.artistService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.artists = res,
            err => console.log(err)
        )
    }

}

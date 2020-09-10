import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../services/loading.service';
import { TrackService } from '../../../../services/track.service';

@Component({
    selector: 'app-tracks',
    templateUrl: './tracks.component.html'
})
export class TracksComponent implements OnInit, AfterViewInit {

    tracks: any = [];
    gridView = false;
    country: string = '';
    id: string = '';
    type: string='';
    page: number = 1;
    limit: number = 10;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private trackService: TrackService) { 
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

    nextPage(){
        this.page = this.page + 1;
        this.getContent();
    }

    prevPage(){
        this.page = this.page - 1;
        this.getContent();
    }

    getContent(){
        switch(this.type){
            case "similar":
                this.getSimilar();
                break;
            default:
                this.getTracks();
        }
    }

    // Initialize songs
    getTracks() {
        this.trackService.getTop(this.country, this.page, this.limit).subscribe(
            res => this.tracks = res,
            err => console.log(err)
        )
    }

    getSimilar() {
        this.trackService.getSimilar(this.id).subscribe(
            res => this.tracks = res,
            err => console.log(err)
        )
    }
}

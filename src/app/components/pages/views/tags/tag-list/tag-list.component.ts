import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from '../../../../../services/loading.service';
import { TagService } from '../../../../../services/tag.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit, AfterViewInit {

    tagName: string;
    type: string;
    artists: any = [];
    albums: any = [];
    tracks: any = [];
    playlists: any = [];
    gridView = false;
    page: number = 1;
    limit: number = 10;

    routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
                private loadingService: LoadingService,
                private tagService: TagService) {
                    this.routeSubscription = this.route.params.subscribe(param => {
                        this.type = param.type;
                        this.tagName = param.name;
                        this.getTag();
                    });
                }

    ngOnInit() {}

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
        this.getTag();
    }

    prevPage(){
        this.page = this.page - 1;
        this.getTag();
    }
    
    getTag(){
        this.tagService.getTag(this.tagName, this.type, this.page, this.limit).subscribe(
            res => { 
                this[this.type] = res;
            },
            err => console.log(err)
        )
    }

}

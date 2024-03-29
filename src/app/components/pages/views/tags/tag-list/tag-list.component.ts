import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoadingService } from 'src/app/services/loading.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tag-list.component.html'
})
export class TagListComponent implements AfterViewInit, OnDestroy {

    tagName: string;
    type: string;
    artists: any = [];
    albums: any = [];
    tracks: any = [];
    playlists: any = [];
    gridView = false;
    page: number = 1;
    limit: number = 12;
    loading: boolean = true;

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
        this.loading = true;
        this.tagService.getTag(this.tagName, this.type, this.page, this.limit).subscribe(
            res => this[this.type] = res
        ).add( () => this.loading = false )
    }

    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

}

import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { TagService } from '../../../../services/tag.service';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit, AfterViewInit {

    tags: any = [];
    page: number = 1;
    limit: number = 12;
    loading: boolean = true;

    constructor(private loadingService: LoadingService,
                private tagService: TagService) { }

    ngOnInit() {
        this.initTags();
    }

    ngAfterViewInit() {
        this.loadingService.stopLoading();
    }

    nextPage(){
        this.page = this.page + 1;
    }

    prevPage(){
        this.page = this.page - 1;
    }

    // Initialize music tags
    initTags() {
        this.loading = true;
        this.tagService.getTop(this.page, this.limit).subscribe(
            res =>  this.tags = res            
        ).add( () => this.loading = false )
    }

}

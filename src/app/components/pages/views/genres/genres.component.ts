import { AfterViewInit, Component, OnInit } from '@angular/core';

import { LoadingService } from '../../../../services/loading.service';
import { TagService } from '../../../../services/tag.service';

@Component({
    selector: 'app-genres',
    templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit, AfterViewInit {

    genres: any = [];
    page: number = 1;
    limit: number = 10;

    constructor(private loadingService: LoadingService,
                private tagService: TagService) { }

    ngOnInit() {
        this.initGenres();
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

    // Initialize music genres
    initGenres() {
        this.tagService.getTop(this.page, this.limit).subscribe(
            res => this.genres = res,
            err => console.log(err)
        )
    }

}

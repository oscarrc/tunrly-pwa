import { Component, HostListener, Input, OnInit } from '@angular/core';

import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-image-card',
    templateUrl: './image-card.component.html'
})
export class ImageCardComponent implements OnInit {

    @Input() item: any;
    @Input() type: any;
    @Input() imageBorderRadiusClass = 'card-img--radius-lg';
    
    routeLink: string;
    imageSrc: string;

    constructor(private searchService: SearchService, 
                private userService: UserService) { }

    @HostListener('click') onClick() {
        this.searchService.hideSearchResult();
    }

    getRandomImage(images: Array<string>):string{
        const size = images.length;
        const rand = Math.floor(Math.random() * size) + 1;
        return images[rand];
    }

    addFavorite() {
        this.userService.setFavorite(this.item._id, this.type).subscribe(
            res => { this.userService.set(res) }
        )
    }

    isFavorite():boolean{
        return this.userService.isFavorite(this.item._id, this.type);
    }

    ngOnInit() {
        switch(this.type){
            case "artist":
                this.routeLink = `/artist/${this.item.name}`;
                this.imageSrc = this.item.image?.thumbnail ? this.getRandomImage(this.item.image.thumbnail) : 
                                this.item.image?.background ? this.getRandomImage(this.item.image.background) : '';
                break;
            case "album":
                this.routeLink = `/album/${this.item?.name}/${this.item?.artist}`;
                this.imageSrc = this.item.image[this.item?.image?.length - 1];
                break;
        }
    }

}

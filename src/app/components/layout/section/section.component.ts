import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit {

    classes = 'carousel';

    @Input() section: any = {};
    @Input() imageCard:boolean = false;
    @Input() primaryCard:boolean = false;
    @Input() secondaryCard:boolean = false;
    @Input() descriptionCard:boolean = false;
    @Input() showImageOptions:boolean = false;
    @Input() imageBorderRadiusClass:string = 'card-img--radius-lg';
    @Input() carouselButtonPositionClass:string;
    @Input() fourSlideCarousel:boolean = false;
    @Input() type:string;

    sliderConfig: any = {};

    constructor() {
    }

    ngOnInit() {
        const prev = '<button class="btn-prev btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-left"></i></button>';
        const next = '<button class="btn-next btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-right"></i></button>';

        this.sliderConfig = {
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: this.fourSlideCarousel ? 4 : 6,
            slidesToScroll: 2,
            speed: 1000,
            prevArrow: prev,
            nextArrow: next,
            autoplay: true,
            // Breakpoints
            responsive: [
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: this.fourSlideCarousel ? 4 : 5
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: this.fourSlideCarousel ? 2 : 3
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false
                    }
                }
            ]
        };

        this.classes = this.classes + ' ' + this.carouselButtonPositionClass;
    }

}

import {Directive, Input, HostBinding, HostListener, ElementRef} from '@angular/core'

@Directive({
    selector: 'img[default]'
  })
  
 export class ImageFallbackDirective {
    @Input() default: string;
    
    constructor(private el: ElementRef){
        if(!this.default) this.default = 'assets/images/cover/extralarge.png';
        if(!this.el.nativeElement.src) this.el.nativeElement.src = this.default;
    }

    @HostListener('error') onError() {
        this.el.nativeElement.src = this.default;
    }
}
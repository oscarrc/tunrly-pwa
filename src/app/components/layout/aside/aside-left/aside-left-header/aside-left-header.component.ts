import { Component, Inject } from '@angular/core';

import { Config } from 'src/app/config/config';
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'app-aside-left-header',
    templateUrl: './aside-left-header.component.html'
})
export class AsideLeftHeaderComponent {

    config: Config;
    brand: any = {};
    beta: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.config = new Config();
        this.brand = this.config.config.brand;
        this.beta = this.config.config.isBeta;
    }

    toggleIconicSidebar() {
        if (this.document.body.classList.contains(Config.classes.iconicSidebar)) {
            this.document.body.classList.remove(Config.classes.iconicSidebar);
        } else {
            this.document.body.classList.add(Config.classes.iconicSidebar);
        }
    }

    hideSidebar() {
        this.document.body.classList.remove(Config.classes.openSidebar);
    }

}

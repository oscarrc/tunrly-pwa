import { EventEmitter, Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Config } from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class SkinService {

    themeSkin: EventEmitter<any> = new EventEmitter();
    bannerBg: EventEmitter<any> = new EventEmitter();

    constructor(private storageService: StorageService) { }

    get skin() {
        return this.themeSkin;
    }

    set skin(value) {
        this.themeSkin.emit(value);
        this.storageService.setLocalStorage(Config.THEME_SKIN, value);
    }

    get background() {
        return this.bannerBg;
    }

    set background(value) {
        this.bannerBg.emit(value);
    }
}

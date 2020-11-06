import { EventEmitter, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

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
        this.storageService.setTheme(value);
    }

    get background() {
        return this.bannerBg;
    }

    set background(value) {
        this.bannerBg.emit(value);
    }
}

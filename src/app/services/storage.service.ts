import { Injectable } from '@angular/core';
import {Config} from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    setLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to local storage', e);
            return null;
        }
    }

    getLocalStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from local storage', e);
            return null;
        }
    }

    clearLocalStorage(key = null){
        if(!key) return localStorage.clear();

        try {
            localStorage.removeItem(key)
        } catch (e) {
            console.error('Error deleting data from local storage', e);
            return null;
        }
    }

    setUser(user){
        localStorage.setItem(Config.CURRENT_USER, JSON.stringify(user));
    }

    setTheme(theme){
        localStorage.setItem(Config.THEME_SKIN, JSON.stringify(theme));
    }

    setLang(lang){
        localStorage.setItem(Config.APP_LANG, JSON.stringify(lang));
    }

    getCurrentUser() {
        return this.getLocalStorage(Config.CURRENT_USER);
    }

    getThemeSkin() {
        return this.getLocalStorage(Config.THEME_SKIN);
    }

    getLang() {
        return this.getLocalStorage(Config.APP_LANG);
    }

    clearCurrentUser(){
        this.clearLocalStorage(Config.CURRENT_USER);
    }
}

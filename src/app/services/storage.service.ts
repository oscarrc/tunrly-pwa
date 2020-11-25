import { Injectable } from '@angular/core';
import {Config} from '../config/config';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    setLocalStorage(key, data):void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to local storage', e);
        }
    }

    getLocalStorage(key):any{
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from local storage', e);
            return null;
        }
    }

    clearLocalStorage(key = null){
        if(!key) localStorage.clear();

        try {
            localStorage.removeItem(key)
        } catch (e) {
            console.error('Error deleting data from local storage', e);
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

    getCurrentUser():Object{
        return this.getLocalStorage(Config.CURRENT_USER);
    }

    getThemeSkin():any{
        return this.getLocalStorage(Config.THEME_SKIN);
    }

    getLang():any{
        return this.getLocalStorage(Config.APP_LANG);
    }

    clearCurrentUser(){
        this.clearLocalStorage(Config.CURRENT_USER);
    }
}

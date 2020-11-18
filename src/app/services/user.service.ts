import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { SkinService } from './skin.service';
import { StorageService } from './storage.service';

@Injectable({ 
    providedIn: "root"
})

export class UserService {
    private userURL = environment.api + '/user/';
    private userSource: BehaviorSubject<any> = new BehaviorSubject({});

    user: Observable<any> = this.userSource.asObservable();
    
    constructor(private httpClient: HttpClient, 
                private skinService: SkinService,
                private storageService: StorageService) {}

    
    check(value){
        return this.httpClient.get(this.userURL  + 'check', { params: { value } });
    }
   
    set(user){        
        if(user){
            try{
                this.storageService.setUser(user)
            }catch{
                this.storageService.clearCurrentUser();
            }

            this.skinService.skin.emit(user['settings']['dark'] ? 'dark' : 'light');
        }else{
           this.storageService.clearCurrentUser();
        }

        this.userSource.next(user);
    }

    get(username:string = null){
        return this.httpClient.get(this.userURL + (username ? username : ''))
    }

    create(user: any){
        return this.httpClient.post(this.userURL, user);
    }

    update(user:any){
        return this.httpClient.put(this.userURL, user);
    }

    updatePassword(oldPassword: string, newPassword: string){
        return this.httpClient.patch(this.userURL + 'profile/password', {oldPassword, newPassword});
    }

    setFavorite(favId: string, type: string){
        return this.httpClient.patch(this.userURL + 'profile/favorites', {favId, type});
    }

    isFavorite(favId: string, type: string): boolean{
        const favorites = this.userSource.getValue().favorite;
        return favorites ? favorites[type].findIndex( f => {return f._id == favId} ) >= 0 : false;
    }

    addToHistory(track: string){
        return this.httpClient.patch(this.userURL + 'profile/history', { track });
    }
}

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

    
    check(value):Observable<Object>{
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

    get(username:string = null):Observable<Object>{
        return this.httpClient.get(this.userURL + (username ? `${username}/profile` : ''))
    }

    create(user: any):Observable<Object>{
        return this.httpClient.post(this.userURL, user);
    }

    update(user:any):Observable<Object>{
        return this.httpClient.put(this.userURL, user);
    }

    updatePassword(oldPassword: string, newPassword: string):Observable<Object>{        
        const user = this.userSource.value;
        return this.httpClient.patch(this.userURL + `${user._id}/password`, {oldPassword, newPassword});
    }

    setFavorite(favId: string, type: string):Observable<Object>{        
        const user = this.userSource.value;
        return this.httpClient.patch(this.userURL + `${user._id}/favorites`, {favId, type});
    }

    isFavorite(favId: string, type: string): boolean{
        const favorites = this.userSource.getValue().favorite;
        return favorites ? favorites[type].includes(favId) : false;
    }

    addToHistory(track: string):Observable<Object>{
        const user = this.userSource.value;
        return this.httpClient.patch(this.userURL + `${user._id}/history`, { track });
    }

    getRecommended():Observable<any>{
        const user = this.userSource.value;
        return this.httpClient.get(this.userURL + `${user._id}/recommendations`);
    }
}

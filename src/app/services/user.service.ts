import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ 
    providedIn: "root"
})

export class UserService {
    private userURL = environment.api + '/user/';
    private userSource: BehaviorSubject<any> = new BehaviorSubject({});

    user: Observable<any> = this.userSource.asObservable();
    
    constructor(private httpClient: HttpClient) {
    }

    
    check(value){
        return this.httpClient.get(this.userURL  + '/check', { params: { value } });
    }
   
    set(user){        
        if(user){
            sessionStorage.setItem('user', JSON.stringify(user));
        }else{
            sessionStorage.removeItem('user');
        }
        
        this.userSource.next(user);
    }

    get(){
        return this.httpClient.get(this.userURL); 
    }

    create(user: any){
        return this.httpClient.post(this.userURL, user);
    }

    update(user:any){
        return this.httpClient.put(this.userURL, user);
    }

    updatePassword(oldPassword: string, newPassword: string){
        return this.httpClient.patch(this.userURL + '/password', {oldPassword, newPassword});
    }

    setFavorite(favId: string, type: string){
        return this.httpClient.patch(this.userURL + '/favorites', {favId, type});
    }

    isFavorite(favId: string, type: string): boolean{
        const favorites = this.userSource.getValue().favorite;
        return favorites[type].findIndex( f => {return f._id == favId} ) >= 0;
    }

    addToHistory(track: string){
        return this.httpClient.patch(this.userURL + '/history', { track });
    }
}

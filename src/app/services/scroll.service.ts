import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    endReached: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    scrollEnd(){
        this.endReached.next(true);
    }

    scrollStart(){
        this.endReached.next(false);
    }
}

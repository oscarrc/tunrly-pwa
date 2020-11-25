import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    limitReached: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    reached(){
        this.limitReached.next(true);
    }

    unreached(){
        this.limitReached.next(false);
    }
}

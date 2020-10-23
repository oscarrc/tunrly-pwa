import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoadingService } from '../../../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnDestroy{
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute, 
                private loadingService: LoadingService) { 
        this.routeSubscription = this.route.params.subscribe(param => {
            if (param.username) {
                this.getUser(param.username);
            }
        });
    }

    getUser(username){
        //TODO User public profile
    }
   
    ngOnDestroy(){
        this.routeSubscription.unsubscribe();
    }

}

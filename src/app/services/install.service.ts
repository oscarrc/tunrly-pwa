import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InstallService {
    private prompt: any = null;
    installPrompt: EventEmitter<any> = new EventEmitter();

    constructor(){
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.prompt = e;
            this.installPrompt.emit(e);
        });
    }

    showPrompt(){
        if(this.prompt) this.prompt.prompt();

        this.prompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') this.prompt = null;
            this.installPrompt.emit(this.prompt);
        })
    }
}

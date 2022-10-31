import { Component } from '@angular/core';
import { DriversFirebaseService } from './shared/services/drivers-firebase.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(private conductor: DriversFirebaseService)
    {
        this.enviarMail();
    }
    enviarMail(): void {
       this.conductor.enviarCorreo();
    }
}

import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IService } from "app/shared/models/service.model";
import { ServicesFirebaseService } from "app/shared/services/services-firebase.service";
import { FuseConfirmationConfig } from "../confirmation.types";


@Component({
    selector     : 'dialog-payment',
    templateUrl  : 'dialog-payment.component.html',
    styleUrls       : ['./dialog-payment.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogDetailsPayment
{
    myServices: IService[] = [];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,                
        private firebaseService: ServicesFirebaseService
    ){
        console.log(data);
        
        this.firebaseService.getServiceById(data['servicio']).subscribe((elem: IService)=>{                                      
            this.myServices.push(elem);            
        });
        
    }    
}
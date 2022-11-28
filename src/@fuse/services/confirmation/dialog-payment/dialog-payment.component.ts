import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Ipayment, PaymentDetails } from "app/shared/models/payment.model";
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
    myPayment: PaymentDetails[] = [];
    loading: boolean = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,                
        private firebaseService: ServicesFirebaseService
    ){
        
        this.firebaseService.getServiceById(data['servicio']).subscribe((elem: IService)=>{                                      
            this.myServices.push(elem);
            this.myPayment.push({
                first_cuote: {
                    amount: elem.payment_details['first_cuote']['amount'],
                    coupon: elem.payment_details['first_cuote']['coupon'],
                    cuote: elem.payment_details['first_cuote']['cuote'],
                    date: elem.payment_details['first_cuote']['date'].toDate().toLocaleDateString(),
                    payment_method: elem.payment_details['first_cuote']['payment_method'],
                    wallet: elem.payment_details['first_cuote']['wallet'] 
                },
                second_cuote: {
                    amount: elem.payment_details['second_cuote']['amount'],
                    coupon: elem.payment_details['second_cuote']['coupon'],
                    cuote: elem.payment_details['second_cuote']['cuote'],
                    date: elem.payment_details['second_cuote']['date'].toDate().toLocaleDateString(),
                    payment_method: elem.payment_details['second_cuote']['payment_method'],
                    wallet: elem.payment_details['second_cuote']['wallet']
                },
                status: elem.payment_details['status']
            })
            this.loading = true;
            console.log(this.myPayment[0].first_cuote['wallet']);
        });
        
    }    
}
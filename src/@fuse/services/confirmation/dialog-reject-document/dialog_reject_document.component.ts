import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';

@Component({
    selector     : 'dialog_reject_document',
    templateUrl     : 'dialog_reject_document.component.html',    
    styles       : [
        `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class DialogRejectDocument{
    toppings = new FormControl('');
    listmotivoreject: any;
    toppingList: string[] = ['Vencido', 'Proximo a vencer', 'No Corresponde al vehiculo registrado', 'No Corresponde a la informacion del conductor', 'No existe información', 'No legal'];
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig, 
        private serviceDriver: DriversFirebaseService              
    ){  
        console.log(data);                           
    }

    enviar_data(){
        console.log(this.listmotivoreject);
        this.serviceDriver.listRespuesta.push({
            'documento': this.data['name'],
            'motivos': this.listmotivoreject,
            'type': this.data['type']            
        });
    }
    agregarmotivo(event){
        this.listmotivoreject = event.value;            
    }
}
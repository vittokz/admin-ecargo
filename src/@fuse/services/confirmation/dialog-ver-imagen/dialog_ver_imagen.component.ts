import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DriversFirebaseService } from "app/shared/services/drivers-firebase.service";
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';

@Component({
    selector     : 'dialog_ver_imagen',
    templateUrl  : 'dialog_ver_imagen.component.html',
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
export class VerImage
{
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,                
    ){  
        console.log(data);
                           
    }   

}
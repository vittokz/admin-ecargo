import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';

@Component({
    selector     : 'dialog_drivers',
    templateUrl  : 'dialog_driver.component.html',
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
export class DialogDrivers
{
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private driverFirebase: DriversFirebaseService         
    ){             
    }
    deletedriver(): void{
        this.driverFirebase.deleteDriverById(this.data['id']);
    }

}
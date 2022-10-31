/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';

@Component({
    selector: 'dialog-eliminar-service-masivamente',
    templateUrl: './dialog-eliminar-service-masivamente.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }

            .img_photo_url {
                display: block;
                margin: auto;
                width: 90px !important;
                height: 90px !important;
                border-radius: 5px;
            }
            .order_upload_photo_url{
                border: 1px solid rgb(16, 122, 221) !important;
                padding: 8px;
                display:flex;
                flex-direction: column;
                align-items:center;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogEliminarServicioMasivamenteComponent {
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private servicesFirebaseServcice: ServicesFirebaseService
    ) {
        console.log('DialogEliminarServicioMasivamenteComponent',data);
    }

    //METODO PARA ELIMINAR SERVICIO
    EliminarServicio(): void {
        this.servicesFirebaseServcice.deleteServiceById(this.data['id']);
    }
}

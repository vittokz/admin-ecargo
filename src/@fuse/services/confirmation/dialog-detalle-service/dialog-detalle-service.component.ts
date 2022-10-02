/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';

@Component({
    selector: 'dialog-user',
    templateUrl: './dialog-detalle-service.component.html',
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
            .content-image{
                display: flex;
                justify-content: center;
                width: 100% !important;
                &__image{
                    width: 60% !important;
                }
            }
             .order-items{
                display: flex;
                justify-content: space-around;
                &__content-origen{
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(19, 112, 169, 0.2), 0 6px 20px 0 rgba(19, 112, 169, 0.2) !important;
                }
                &__content-destino{
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(231, 36, 64, 0.2), 0 6px 20px 0 rgba(231, 36, 64, 0.2) !important;
                }
                &__content-detalle{
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
                }
                &__title{
                    font-weight: bold !important;
                    font-size: 16px;
                    color: black;
                    margin-bottom: 5px;
                }
            }
            .example-card {
                max-width: 90% !important;
                display: block;
                margin: auto;
                padding: 8px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }

            .example-header-image {
                background-image: url('https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg');
                background-size: cover;
            }
            mat-panel-title{
                font-weight: bold !important;
                font-size: 16px;
            }
            mat-expansion-panel{
                border: 1px solid rgba(0, 0, 0, 0.2) !important;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }
            mat-expansion-panel-header{
                background-color: rgb(245, 243, 243);
            }
            strong{
                font-size: 15px;
                color: #323232;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogDetalleServiceComponent {
    panelOpenState = false;
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,  private servicesService: ServicesFirebaseService) {
        console.log(data);
    }

    getStatus(status): any {
        let respuesta;
            if(status=== 1){
                respuesta = 'Creado';
            }else
            if(status=== 2){
                respuesta = 'Aceptado por conductor';
            }else
            if(status=== 3){
                respuesta = 'Carga recogida y en camino a entregar';
            }else
            if(status=== 4){
                respuesta = 'Carga entregada';
            }else
            if(status=== 5){
                respuesta = 'Pagado. El usuario realizó el pago y calificó el servicio';
            }
            if(status=== 6){
                respuesta = 'Programado';
            }else
            if(status=== 7){
                respuesta = 'Programado. Aceptado por conductor';
            }else
            if(status=== 8){
                respuesta = 'Cancelado';
            }else
            if(status=== 9){
                respuesta = 'Solicitudes pérdidas';
            }else{
                respuesta = 'Sin estado';
            }
     
        return respuesta;
    }
}

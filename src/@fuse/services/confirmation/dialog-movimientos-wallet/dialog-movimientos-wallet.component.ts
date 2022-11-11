/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { IService } from 'app/shared/models/service.model';
import { PaymentService } from 'app/shared/services/payments.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { FuseConfirmationService } from '../confirmation.service';

@Component({
    selector: 'dialog-movimientos-wallet',
    templateUrl: './dialog-movimientos-wallet.component.html',
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
            .title-movimientos {
                font-size: 22px;
                font-weight: bold;
            }
            .content-movimientos {
                display: flex;
                justify-content: space-around;
                background-color: #4078e8;
                padding: 10px;
                font-size: 14px;
                color: white;
                border-radius: 8px;
                margin-bottom: 8px;
                margin-top: 8px;
                &__fecha {
                    white-space: nowrap;
                }
                &__detalle {
                    white-space: nowrap;
                }
                &__valor {
                    white-space: nowrap;
                }
                &__servicio {
                    white-space: nowrap;
                }
            }
            .scroll {
                width: 100%;
                overflow: auto;
                padding: 5px;
            }
            .content-sinMovimientos {
                padding: 10px;
                border: 1px solid #f3593e;
                font-size: 18px;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogMovimientosWalletComponent implements OnInit {
    listPayments = [];
    infoService: IService[] = [];
    /**
     * Constructor
     */
    constructor(
        private servicesService: ServicesFirebaseService,
        private ruta: Router,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService,
        private paymentService: PaymentService,
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig
    ) {}

    ngOnInit(): void {
        this.getPaymentsByIdUser();
    }
    getPaymentsByIdUser(): void {
        this.paymentService
            .getPaymentsById(this.data['id'])
            .subscribe((payment) => {
                this.listPayments = [];
                payment.forEach((dato, index) => {

                    var date = new Date(
                        dato.payload.doc.data()['payment_date']['seconds'] +
                            dato.payload.doc.data()['payment_date'][
                                'nanoseconds'
                            ]
                    );
                    this.listPayments.push({
                        no: index + 1,
                        id: dato.payload.doc.id,
                        walleti_amount_used:
                            dato.payload.doc.data()['amount_details'][
                                'wallet_amount_used'
                            ],
                        creation_date: date,
                        payment_type: dato.payload.doc.data()['payment_type'],
                        service_uid: dato.payload.doc.data()['service_uid'],
                    });
                });
            });
    }
    irServicio(pagoSeleccionado): void {
        this.servicesService
            .getServiceById(pagoSeleccionado.service_uid)
            .subscribe((service) => {
                if (service !== undefined) {
                    this.infoService = [];
                    this.infoService.push({
                        no: 1,
                        addresses_info: service['addresses_info'],
                        cancelled_details: service['addresses_info'],
                        creation_date: service['creation_date'],
                        messages_count: service['messages_count'],
                        payment_details: service['payment_details'],
                        pickup_position: service['pickup_position'],
                        rating_info: service['rating_info'],
                        service_details: service['service_details'],
                        service_track: service['service_track'],
                        status: service['status'],
                        users_info: service['users_info'],
                        vehicle_info: {
                            brand: service['vehicle_info'].brand
                                ? service['vehicle_info'].brand
                                : 'Sin marca',
                            color: service['vehicle_info'].color
                                ? service['vehicle_info'].color
                                : 'Sin color',
                            modelo: service['vehicle_info'].modelo
                                ? service['vehicle_info'].modelo
                                : 'Sin modelo',
                            plate: service['vehicle_info'].plate
                                ? service['vehicle_info'].plate
                                : 'Sin placa',
                            type: service['vehicle_info'].type
                                ? service['vehicle_info'].type
                                : 'Sin tipo',
                        },
                    });
                    const dialogRef =
                        this._fuseConfirmationService.openDialogDetalleServicioMovimiento(
                            this.infoService,
                            'editar-servicio'
                        );
                }
                else{
                    this._snackBar.open('El pago seleccionado tiene errores!!!', '', {
                        duration: 2000,
                        panelClass: ['mat-toolbar', 'mat-primary'],
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                    });
                }
            });
    }
}

/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    Component,
    Inject,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';

export interface IData {
    'dataChangeDriver'?: string;
    'idDriver'?: string;
    'idDriverNew'?: string;
    'idServicio'?: string;
};

@Component({
    selector: 'dialog-editar-servicio',
    templateUrl: './dialog-editar-service.component.html',
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
            mat-form-field {
                width: 100%;
            }
            .content-image {
                display: flex;
                justify-content: center;
                width: 100% !important;
                &__image {
                    width: 60% !important;
                }
            }
            .order-items-conductor {
                display: flex;
                justify-content: space-around;
            }
            .order-items {
                display: flex;
                justify-content: start;
                &__content-origen {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(19, 112, 169, 0.2),
                        0 6px 20px 0 rgba(19, 112, 169, 0.2) !important;
                }
                &__content-destino {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(231, 36, 64, 0.2),
                        0 6px 20px 0 rgba(231, 36, 64, 0.2) !important;
                }
                &__content-detalle {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
                }
                &__title {
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
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }

            .example-header-image {
                background-image: url('https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg');
                background-size: cover;
            }
            mat-panel-title {
                font-weight: bold !important;
                font-size: 16px;
            }
            mat-expansion-panel {
                border: 1px solid rgba(0, 0, 0, 0.2) !important;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }
            mat-expansion-panel-header {
                background-color: rgb(245, 243, 243);
            }
            strong {
                font-size: 15px;
                color: #323232;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogEditarServiceComponent implements OnInit {
    panelOpenState = false;
    message: string = 'Conductor actualizado correctamente.';
    messageEstado: string = 'Estado del servicio actualizado correctamente.';
    selectedValue: string = 'Seleccione conductor';
    infoDriver = [];
    motivoCambioDriver: string='';
    infoAuxDriver = [];
    listEstados: any[] = [
        {
            name: 'Creado',
            value: 1,
        },
        {
            name: 'Aceptado por conductor',
            value: 2,
        },
        {
            name: 'Carga recogida y en camino a entregar',
            value: 3
        },
        {
            name: 'Carga entregada',
            value: 4
        },
        {
            name: 'Pagado. El usuario realizó el pago y calificó el servicio',
            value: 5,
        },

        {
            name: 'Programado',
            value: 6,
        },
        {
            name: 'Programado. Aceptado por conductor',
            value: 7,
        },
        {
            name: 'Cancelado',
            value: 8,
        },
        {
            name: 'Solicitudes pérdidas',
            value: 9,
        },
        {
            name: 'Sin estado',
            value: 10
        }
    ];
    /**
     * Constructor
     */
    constructor(
        private serviceServiceFirebase: ServicesFirebaseService,
        private driverServiceFirebase: DriversFirebaseService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig
    ) {
        console.log(data);
    }

    ngOnInit(): void {
        this.getDriversByTypeConductor(this.data['vehicle_info'].type);
    }
    getDriversByTypeConductor(tipoVehycle: string): void {
        if (tipoVehycle === 'Sin tipo') {
            this.driverServiceFirebase.getDriver().subscribe((driver) => {
                this.infoDriver = [];
                driver.forEach((dato, index) => {
                    this.infoDriver.push({
                        no: index + 1,
                        id: dato.payload.doc.id,
                        busy: dato.payload.doc.data()['busy'],
                        creation_date: dato.payload.doc.data()['creation_date'],
                        current_location:
                            dato.payload.doc.data()['current_location'],
                        current_summary:
                            dato.payload.doc.data()['current_summary'],
                        documents_status:
                            dato.payload.doc.data()['document_status'],
                        documents: dato.payload.doc.data()['documents'],
                        enable: dato.payload.doc.data()['enable'],
                        face_data: dato.payload.doc.data()['face_data'],
                        notification_info:
                            dato.payload.doc.data()['notification_info'],
                        profile_info: dato.payload.doc.data()['profile_info'],
                        rating: dato.payload.doc.data()['rating'],
                        status: dato.payload.doc.data()['status'],
                        vehicle_info: dato.payload.doc.data()['vehicle_info'],
                    });
                });
            });
        } else {
            this.driverServiceFirebase
                .getDriverByType(tipoVehycle)
                .subscribe((driver) => {
                    this.infoDriver = [];
                    driver.forEach((dato, index) => {
                        this.infoDriver.push({
                            no: index + 1,
                            id: dato.payload.doc.id,
                            busy: dato.payload.doc.data()['busy'],
                            creation_date:
                                dato.payload.doc.data()['creation_date'],
                            current_location:
                                dato.payload.doc.data()['current_location'],
                            current_summary:
                                dato.payload.doc.data()['current_summary'],
                            documents_status:
                                dato.payload.doc.data()['document_status'],
                            documents: dato.payload.doc.data()['documents'],
                            enable: dato.payload.doc.data()['enable'],
                            face_data: dato.payload.doc.data()['face_data'],
                            notification_info:
                                dato.payload.doc.data()['notification_info'],
                            profile_info:
                                dato.payload.doc.data()['profile_info'],
                            rating: dato.payload.doc.data()['rating'],
                            status: dato.payload.doc.data()['status'],
                            vehicle_info:
                                dato.payload.doc.data()['vehicle_info'],
                        });
                    });
                });
        }
    }

    seleccionarDriver(dataDriver): void {
        this.infoAuxDriver = dataDriver;
    }

    changueDriver(): void{
        this.registrarCambioConductor();
        this.registrarHistorialCambioConductor();
    }
    registrarHistorialCambioConductor(): void {
        const date = new Date();
        const fecha = date.getFullYear() + '-'+ (date.getMonth()+1) + '-'+ date.getUTCDate();
        const data: IData = {
           'dataChangeDriver': fecha,
           'idDriver' : this.data['users_info'].driver_info.uid !==undefined ? this.data['users_info'].driver_info.uid : 'No tenia asignacion de conductor',
           'idDriverNew':  this.infoAuxDriver['id'],
           'idServicio':  this.data['id']
        };
       this.driverServiceFirebase.insertChangeDriver(data);
    }
    registrarCambioConductor(): void {
        const dataDriver = this.infoAuxDriver;
        this.serviceServiceFirebase
            .updateService(this.data['id'], dataDriver)
            .then((resp) => {
                if (resp === 'success') {
                    this._snackBar.open(this.message, '', {
                        duration: 2000,
                        panelClass: ['mat-toolbar', 'mat-primary'],
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                    });
                    this.data['users_info'].driver_info.name =
                        dataDriver['profile_info'].names +
                        ' ' +
                        dataDriver['profile_info'].last_names;
                    this.data['users_info'].driver_info.email =
                        dataDriver['profile_info'].email;
                    this.data['users_info'].driver_info.phone =
                        dataDriver['profile_info'].phone;
                    this.getDriversByTypeConductor(
                        this.data['vehicle_info'].type
                    );
                }
            });
    }

    seleccionarEstado(estadoSeleccionado: number): void{
        this.serviceServiceFirebase
            .updateStatusService(this.data['id'], estadoSeleccionado)
            .then((resp) => {
                if (resp === 'success') {
                    this._snackBar.open(this.messageEstado, '', {
                        duration: 2000,
                        panelClass: ['mat-toolbar', 'mat-primary'],
                        horizontalPosition: 'right',
                        verticalPosition: 'bottom',
                    });
                }
            });
    }

    getStatus(status): any {
        let respuesta;
        if (status === 1) {
            respuesta = 'Creado';
        } else if (status === 2) {
            respuesta = 'Aceptado por conductor';
        } else if (status === 3) {
            respuesta = 'Carga recogida y en camino a entregar';
        } else if (status === 4) {
            respuesta = 'Carga entregada';
        } else if (status === 5) {
            respuesta =
                'Pagado. El usuario realizó el pago y calificó el servicio';
        }
        if (status === 6) {
            respuesta = 'Programado';
        } else if (status === 7) {
            respuesta = 'Programado. Aceptado por conductor';
        } else if (status === 8) {
            respuesta = 'Cancelado';
        } else if (status === 9) {
            respuesta = 'Solicitudes pérdidas';
        } else {
            respuesta = 'Sin estado';
        }

        return respuesta;
    }
}

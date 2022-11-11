/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IService } from 'app/shared/models/service.model';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';

@Component({
    selector: 'app-services-actives',
    templateUrl: './services-actives.component.html',
    styleUrls: ['./services-actives.component.scss'],
})
export class ServicesActivesComponent implements OnInit {
    displayedColumns: string[] = [

        'UserInfoName',
        'DriverInfoName',
        'deliveryAddress',
        'deliveryCity',
        'pickupAddress',
        'pickupCity',
        'serviceDetailsType',
        'status',
        'acciones',
    ];
    dataSource: MatTableDataSource<IService>;
    infoServices: IService[] = [];
    nuevaDataFiltaradaServices: IService[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private servicesService: ServicesFirebaseService
    ) {
        this.getServices();
    }

    ngOnInit(): void {}

    //Ver detalle del servicio
    verDetalleServicio(service): void {
        const dialogRef =
            this._fuseConfirmationService.openDialogDetalleServicio(
                service,
                'ver-detalle'
            );
    }

    getServices(): void {
        this.servicesService.getServices().subscribe((resp) => {
            this.infoServices = [];
            resp.forEach((service, index) => {
                this.infoServices.push({
                    no: index + 1,
                    id: service.payload.doc.id,
                    addresses_info:
                        service.payload.doc.data()['addresses_info'],
                    cancelled_details:
                        service.payload.doc.data()['addresses_info'],
                    creation_date: service.payload.doc.data()['creation_date'],
                    messages_count:
                        service.payload.doc.data()['messages_count'],
                    payment_details:
                        service.payload.doc.data()['payment_details'],
                    pickup_position:
                        service.payload.doc.data()['pickup_position'],
                    rating_info: service.payload.doc.data()['rating_info'],
                    service_details:
                        service.payload.doc.data()['service_details'],
                    service_track: service.payload.doc.data()['service_track'],
                    status: service.payload.doc.data()['status'],
                    users_info: service.payload.doc.data()['users_info'],
                    vehicle_info: {
                        brand: service.payload.doc.data()['vehicle_info'].brand
                            ? service.payload.doc.data()['vehicle_info'].brand
                            : 'Sin marca',
                        color: service.payload.doc.data()['vehicle_info'].color
                            ? service.payload.doc.data()['vehicle_info'].color
                            : 'Sin color',
                        modelo: service.payload.doc.data()['vehicle_info']
                            .modelo
                            ? service.payload.doc.data()['vehicle_info'].modelo
                            : 'Sin modelo',
                        plate: service.payload.doc.data()['vehicle_info'].plate
                            ? service.payload.doc.data()['vehicle_info'].plate
                            : 'Sin placa',
                        type: service.payload.doc.data()['vehicle_info'].type
                            ? service.payload.doc.data()['vehicle_info'].type
                            : 'Sin tipo',
                    },
                });
            });
            this.nuevaDataFiltaradaServices = [];

            this.infoServices.forEach((service) => {
                if (service.status === 2 || service.status ===3) {
                    this.nuevaDataFiltaradaServices.push(service);
                }
            });

            this.dataSource = new MatTableDataSource(this.nuevaDataFiltaradaServices);
            this.dataSource.paginator = this.paginator;
        });
    }

    //recuperar el estado del servicio
    getStatus(service): any {
        const resp = this.servicesService.getStatus(service);
        return resp;
    }
}

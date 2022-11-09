/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import {
    AfterViewInit,
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { IService, IServiceTable } from 'app/shared/models/service.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PaymentService } from 'app/shared/services/payments.service';
@Component({
    selector: 'app-list-services',
    templateUrl: './list-services.component.html',
    styleUrls: ['./list-services.component.scss'],
})
export class ListServicesComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = [
        'UserInfoName',
        'DriverInfoName',
        'createDate',
        'deliveryAddress',
        'deliveryCity',
        'pickupAddress',
        'pickupCity',
        'vehicleInfoType',
        'serviceDetailsType',
        'status',
        'acciones'
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<IService>;
    infoServices: IService[] = [];
    paramUrl: any;
    configForm: UntypedFormGroup;
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private paymentService: PaymentService,
        private servicesService: ServicesFirebaseService
    ) {
        this.route.queryParamMap.subscribe((params) => {
            this.paramUrl = { ...params.keys, ...params };
        });
        this.getServices();
        this.config();
    }
    config(): void {
        this.configForm = this._formBuilder.group({
            title: 'VER INFORMACIÓN DEL SERVICIO ',
            message: 'VER',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:eye',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: false,
                    label: 'Remove',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: false,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });
    }
    ngOnInit(): void {}

    ngAfterViewInit(): void {
        if (this.paramUrl.params.id) {
        } else {
            this.getServices();
        }
    }
    getServices(): void {
        this.servicesService.getServices().subscribe((resp) => {
            this.infoServices = [];
            resp.forEach((service, index) => {
                if (
                    service.payload.doc.data()['users_info']['client_info']['uid'] ===
                    this.paramUrl.params.id
                ){
                    this.infoServices.push({
                        no: index + 1,
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
                                brand: service.payload.doc.data()['vehicle_info'].brand ? service.payload.doc.data()['vehicle_info'].brand: 'Sin marca',
                                color: service.payload.doc.data()['vehicle_info'].color ? service.payload.doc.data()['vehicle_info'].color: 'Sin color',
                                modelo: service.payload.doc.data()['vehicle_info'].modelo ? service.payload.doc.data()['vehicle_info'].modelo: 'Sin modelo',
                                plate: service.payload.doc.data()['vehicle_info'].plate ? service.payload.doc.data()['vehicle_info'].plate: 'Sin placa',
                                type: service.payload.doc.data()['vehicle_info'].type ? service.payload.doc.data()['vehicle_info'].type : 'Sin tipo',
                        }
                    });
                }
            });
            this.dataSource = null;
            this.dataSource = new MatTableDataSource(this.infoServices);
            this.dataSource.paginator = this.paginator;
        });
    }
    getServicesById(idUser: string): void {}

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
     //Ver detalle del servicio
     verDetalleServicio(service): void {
        const dialogRef = this._fuseConfirmationService.openDialogDetalleServicio(
            service,
            'ver-detalle'
        );
    }

    //recuperar el estado del servicio
    getStatus(service): any {
        const resp = this.servicesService.getStatus(this.infoServices);
        return resp;
    }

  
}

/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import {
    AfterViewInit,
    Component,
    Input,
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
@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
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
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<IService>;
    infoServices: IService[] = [];
    nuevaDataFiltaradaServices:  IService[] = [];
    paramUrl: any;
    configForm: UntypedFormGroup;
    constructor(
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private servicesService: ServicesFirebaseService
    ) {
        this.route.queryParamMap.subscribe((params) => {
            this.paramUrl = { ...params.keys, ...params };
        });
      
        this.getServices(10);
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
    ngOnInit(): void {      }

    ngAfterViewInit(): void {
        if (this.paramUrl.params.id) {
        } else {
          //  this.getServices(this.estado);
        }
    }
    getServices(estado): void {
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
            this.nuevaDataFiltaradaServices =[];
            if(estado===10){
                this.nuevaDataFiltaradaServices =this.infoServices;
            }
            else{
                this.infoServices.forEach((service)=>{
                    if(service.status===estado){
                        this.nuevaDataFiltaradaServices.push(service);
                    }
                });
            }
            
            this.dataSource = null;
            this.dataSource = new MatTableDataSource(this.nuevaDataFiltaradaServices);
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
        const dialogRef =
            this._fuseConfirmationService.openDialogDetalleServicio(
                service,
                'ver-detalle'
            );
    }

     //editar  servicio
     editarServicio(service): void {
        const dialogRef =
            this._fuseConfirmationService.openDialogEditarServicio(
                service,
                'editar-servicio'
            );
    }

    //recuperar el estado del servicio
    getStatus(service): any {
        const resp = this.servicesService.getStatus(service);
        return resp;
    }

    asignarEstado(estado): void{
        if(estado.srcElement.outerText==='Programados'){
            this.getServices(6);
        }
        else if(estado.srcElement.outerText==='Activos'){
            this.getServices(2);
        }
        else if(estado.srcElement.outerText==='Cancelados'){
            this.getServices(8);
        }
        else if(estado.srcElement.outerText==='Perdidos'){
            this.getServices(9);
        }
        else if(estado.srcElement.outerText==='Todos'){
            this.getServices(10);
        }
    }
}

/* eslint-disable no-trailing-spaces */
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

@Component({
  selector: 'app-list-services-all',
  templateUrl: './list-services-all.component.html',
  styleUrls: ['./list-services-all.component.scss']
})
export class ListServicesAllComponent implements OnInit, AfterViewInit {
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
  TIPO_ESTADOS: any = {
    creado : 1,
    aceptados:2,
    carga_recogida:3,
    carga_entrega:4,
    pagados:5,
    programados : 6,
    programado_aceptado:7,
    cancelados:8,
    perdidos:9
};
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
    private servicesService: ServicesFirebaseService
) {
    this.route.queryParamMap.subscribe((params) => {
        this.paramUrl = { ...params.keys, ...params };
    });
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
       // this.getServices();
    }
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
    const resp = this.servicesService.getStatus(service);
    return resp;
}
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IService } from 'app/shared/models/service.model';
import { AuthFirebaseService } from 'app/shared/services/auth-firebase.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import * as XLSX from 'xlsx';
@Component({
    selector: 'app-main-cargue-masivo',
    templateUrl: './main-cargue-masivo.component.html',
    styleUrls: ['./main-cargue-masivo.component.scss'],
})
export class MainCargueMasivoComponent implements OnInit, OnDestroy {
    fileName = '';
    newService: IService = {};
    addListServices: IService[] = [];
    uidUserLogueado: string = '';
    constructor(
        private _authServiceFirebase: AuthFirebaseService,
        private servicesService: ServicesFirebaseService
    ) {
        this.uidUserLogueado = this._authServiceFirebase.getUidUser();
        this.inicializarInterface();
    }

    inicializarInterface(): void {
        this.newService = {
            addresses_info: {},
            cancelled_details: {},
            creation_date: '',
            messages_count: 0,
            payment_details: {},
            pickup_position: {},
            rating_info: {},
            service_details: {},
            service_track: {},
            status: 6,
            users_info: {},
        };
    }

    ngOnInit(): void {}

    //Linea de codigo que carga masivamente el excel
    onFileSelected(event: any): void {
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        const extension = selectedFile.name
            .substring(selectedFile.name.indexOf('.'))
            .toLowerCase();
        if (extension === '.xlsx' || extension === '.xls') {
            fileReader.onload = function (event) {
                let fileUrl = (<FileReader>event.target).result;
                let workbook = XLSX.read(fileUrl, { type: 'binary' });
                workbook.SheetNames.forEach((sheet) => {
                    const data = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheet]
                    );
                    localStorage.setItem('dataMasiva', JSON.stringify(data));
                });
            };
            let listData: any;
            listData = JSON.parse(localStorage.getItem('dataMasiva'));
            console.log(listData);
            //ASIGNO DATA EN addresses_info
            listData.forEach(
              (item)=>{
                this.newService.addresses_info.delivery_address = {
                  address: item.Direccion_1,
                  city: item.Ciudad_1,
                  country: item.Pais_1,
                  details: '',
                  person_name: '',
                  position: {
                      latitude: item.Latitud_1,
                      longitude: item.Longitud_1,
                  },
              };
              this.newService.addresses_info.pickup_address = {
                address: item.Direccion,
                city: item.Ciudad,
                country: item.Pais,
                details: '',
                position: {
                    latitude: item.Latitud,
                    longitude: item.Longitud,
                },
              };
              this.newService.cancelled_details = {};
              this.newService.creation_date = '';
              this.newService.messages_count = 0;
              this.newService.payment_details = {};
              this.newService.pickup_position = {
                  geohash: '',
                  geopoint: {
                      latitude: item.Latitud_1,
                      longitude: item.Longitud_1,
                  },
              };
              this.newService.service_details = {
                service_type: item.Tipo_de_carga,
                volume: item.Volumen_cm3,
                weight: item.Peso_kg
              };
              this.newService.service_track = {};
              this.newService.rating_info = {};
              this.newService.status = 6;
              this.newService.users_info = {
                  client_info: {
                      email: '',
                      emg_phone: '',
                      name: '',
                      phone: '',
                      photo_url: '',
                      uid: this.uidUserLogueado,
                  },
                  driver_info: {},
              };
              this.newService.vehicle_info = {};
              this.addListServices.push(this.newService);
              this.inicializarInterface();
              }
            );
                this.addListServices.forEach(
              (service)=>{
                this.servicesService.insertService(service);
              }
            );
        }
    }
    ngOnDestroy(): void {
     this._authServiceFirebase.removeDataServicesMasivo();
    }
}

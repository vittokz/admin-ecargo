/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { MapServiciosService } from 'app/shared/services/map-services.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { environment } from 'environments/environment';
import * as Mapboxgl from 'mapbox-gl';
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
            .content-image {
                display: flex;
                justify-content: center;
                width: 100% !important;
                &__image {
                    width: 60% !important;
                }
            }
            .order-items {
                display: flex;
                justify-content: space-around;
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
            #mapa-mapbox {
                width: 100%;
                height: 300px;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogDetalleServiceComponent implements OnInit {
    panelOpenState = false;
    mapa: Mapboxgl.Map;
    lngOrigen: number;
    latOrigen: number;
    lngDestino: number;
    latDestino: number;
    uidDriver: string='';
    latitudDriver: number;
    longitudDriver: number;
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private mapServiciosService: MapServiciosService,
        private driversService: DriversFirebaseService
    ) {

        this.uidDriver= data['users_info'].driver_info.uid;
       
        this.lngOrigen= data['addresses_info'].delivery_address.position._long;
        this.latOrigen= data['addresses_info'].delivery_address.position._lat;

        this.lngDestino= data['addresses_info'].pickup_address.position._long;
        this.latDestino= data['addresses_info'].pickup_address.position._lat;
    }
    getDriver(uidDriver: string): void {
        this.driversService.getDriverById(uidDriver).subscribe(
        (driver)=>{
            this.latitudDriver=driver['current_location'].geopoint._lat;
            this.longitudDriver=driver['current_location'].geopoint._long;
            this.crearMarcador(this.longitudDriver,this.latitudDriver, 'blue');
        });
    }
    ngOnInit(): void {
        (Mapboxgl as any).accessToken = environment.mapBox.tokenMapBox;
        this.mapa = new Mapboxgl.Map({
            container: 'mapa-mapbox',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.lngOrigen,this.latOrigen],
            zoom: 5,
        });
        const url = environment.mapBox.api + '/' + this.lngOrigen + ',' + this.latOrigen + ';' + this.lngDestino + ',' + this.latDestino + '?' +
        'alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=' + environment.mapBox.tokenMapBox;
        this.mapServiciosService.consultaApiMapa(url).subscribe((resp)=>{
            this.mapServiciosService.pintarMapa(resp.routes[0],this.mapa);

        });
        this.getDriver(this.uidDriver);
         this.crearMarcador(this.lngOrigen,this.latOrigen);
         this.crearMarcador(this.lngDestino,this.latDestino);
    }

    crearMarcador(lng: number, lat: number, color: string='red'): void{
        const marker = new Mapboxgl.Marker({
            color: color,
            draggable: true
        })
        .setLngLat([lng,lat])
        .addTo(this.mapa);
        marker.on('drag',()=>{

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

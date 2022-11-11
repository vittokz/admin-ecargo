/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IService } from 'app/shared/models/service.model';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';

@Component({
    selector: 'app-service-id',
    templateUrl: './service-id.component.html',
    styleUrls: ['./service-id.component.scss'],
})
export class ServiceIdComponent implements OnInit {
    paramUrl: any;
    infoService: IService[] = [];
    constructor(private route: ActivatedRoute,
      private servicesService: ServicesFirebaseService) {
        this.route.queryParamMap.subscribe((params) => {
            this.paramUrl = { ...params.keys, ...params };
        });
        this.getServiceById();
    }
    getServiceById(): void {
      this.servicesService.getServiceById(this.paramUrl.params.id).subscribe((service) => {
        this.infoService = [];
                this.infoService.push({
                    no: 1,
                    addresses_info:
                        service['addresses_info'],
                    cancelled_details:
                        service['addresses_info'],
                    creation_date: service['creation_date'],
                    messages_count:
                        service['messages_count'],
                    payment_details:
                        service['payment_details'],
                    pickup_position:
                        service['pickup_position'],
                    rating_info: service['rating_info'],
                    service_details:
                        service['service_details'],
                    service_track: service['service_track'],
                    status: service['status'],
                    users_info: service['users_info'],
                    vehicle_info: {
                            brand: service['vehicle_info'].brand ? service['vehicle_info'].brand: 'Sin marca',
                            color: service['vehicle_info'].color ? service['vehicle_info'].color: 'Sin color',
                            modelo: service['vehicle_info'].modelo ? service['vehicle_info'].modelo: 'Sin modelo',
                            plate: service['vehicle_info'].plate ? service['vehicle_info'].plate: 'Sin placa',
                            type: service['vehicle_info'].type ? service['vehicle_info'].type : 'Sin tipo',
                    }
                });
        // this.dataSource = null;
        // this.dataSource = new MatTableDataSource(this.infoServices);
        // this.dataSource.paginator = this.paginator;
    });
    }

    ngOnInit(): void {}
}

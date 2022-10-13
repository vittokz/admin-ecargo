/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';

@Component({
    selector: 'app-list-drivers',
    templateUrl: './list-drivers.component.html',
    styleUrls: ['./list-drivers.component.scss'],
})
export class ListDriversComponent implements OnInit {
    infoDriver = [];
    constructor(private driverService: DriversFirebaseService) {}

    ngOnInit(): void {
        this.driverService.getDriverByType('prueba').subscribe((driver) => {
            this.infoDriver = [];
            driver.forEach((dato, index) => {
                this.infoDriver.push({
                    no: index + 1,
                    id: dato.payload.doc.id,
                    busy: dato.payload.doc.data()['busy'],
                    creation_date: dato.payload.doc.data()['creation_date'],
                    current_location: dato.payload.doc.data()['current_location'],
                    current_summary: dato.payload.doc.data()['current_summary'],
                    documents_status: dato.payload.doc.data()['document_status'],
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
            console.log(this.infoDriver);
        });
       
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VehiclesList } from '../models/ajustes-sistema.model';
import { ICoupon } from '../models/coupon.model';

@Injectable({
    providedIn: 'root',
})
export class AjustesSistemaService {
    constructor(private afs: AngularFirestore) {}

    /*
    Metodos para modulo vehiculos
    */
    //trae los vehiculos en la base de datos
    getVehiculos(): any {
        return this.afs.collection('info').snapshotChanges();
    }
    //Agregar un vehiculo a la base de datos
    insertVehiculo(data: VehiclesList) {
        const docRef = this.afs.collection('info2').doc('general');
        return  docRef.set({vehicles_list: data});
    }
    //actualiza un vehiculo
    async updateVehiculo(dataVehiculo: VehiclesList) {
        await this.afs.collection('info').doc('general').update({
            vehicles_list: {
                category: dataVehiculo.category,
                max_weight: dataVehiculo.max_weight,
                min_weight: dataVehiculo.min_weight,
                name: dataVehiculo.name,
            }
        });
        return 'success';
    }
}

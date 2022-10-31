/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class DriversFirebaseService {
    constructor(private afs: AngularFirestore, private http: HttpClient) {}

    //Traer todos los conductores
    getDriver(): any {
        return this.afs.collection('drivers').snapshotChanges();
    }

    //Traer conductores por tipo de vehiculo
    getDriverByType(typeVehicle: string): any {
        const respData = this.afs.collection('drivers', (ref) =>
            ref.where('vehicle_info.type', '==', typeVehicle)
        );
        return respData.snapshotChanges();
    }

    //Traer un conductor por Id
    getDriverById(documentIdDriver: string) {
        return this.afs
            .collection('drivers')
            .doc(documentIdDriver)
            .valueChanges();
    }

    //enviar mail conductor
    enviarCorreo() {
        const formData = new FormData();
            formData.append('email','vittorio15@hotmail.com' );
            formData.append('usuario', 'VITTORIO CASSETTA');
            formData.append('descripcion','pruebas envio');
        this.http.post<any>(
            'https://dalelapata.narino.gov.co/ApiDalelapata/adopcionPostulacion/envioMail.php',
            formData).subscribe((resp)=>{
            console.log('respuesta email:',resp);
        });
    }
}

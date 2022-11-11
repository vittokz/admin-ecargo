/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IService } from '../models/service.model';
import { IUserFirebase } from '../models/user.model';
@Injectable({
    providedIn: 'root',
})
export class ServicesFirebaseService {
    constructor(private afs: AngularFirestore) {}

    //Traer todos los servicios
    getServices(): any {
        return this.afs.collection('services').snapshotChanges();
    }

    //Traer un servicio por Id
    getServiceById(documentIdUser: string) {
        return this.afs.collection('services').doc(documentIdUser).valueChanges();
    }
    //Actualiza un servicio segun su ID
    async updateService(documentIdService: string, dataDriver: any) {
        await this.afs.collection('services').doc(documentIdService).update({
            'users_info.driver_info.name': dataDriver['profile_info'].names + ' ' +dataDriver['profile_info'].last_names,
            'users_info.driver_info.emg_phone1': dataDriver['profile_info'].emg_phone1,
            'users_info.driver_info.emg_phone2': dataDriver['profile_info'].emg_phone2,
            'users_info.driver_info.email': dataDriver['profile_info'].email,
            'users_info.driver_info.phone': dataDriver['profile_info'].phone,
            'users_info.driver_info.photo_url': dataDriver['profile_info'].photo_url,
            'users_info.driver_info.uid': dataDriver['id'],
        });

        await this.afs.collection('drivers').doc(dataDriver['id']).update({
            'busy': true,
        });
        return 'success';
    }

     //Actualiza estado de un servicio segun su ID
     async updateStatusService(documentIdService: string, newStatus: number) {
        await this.afs.collection('services').doc(documentIdService).update({
            'status': newStatus
        });
        return 'success';
    }

    //Agregar un servicio a la base de datos
    async insertService(data: IService) {
        return new Promise<any>((resolve, reject) => {
            this.afs
                .collection('services')
                .add(data)
                .then(
                    (response) => 'success',
                    (error) => {
                        reject(error);
                    }
                );
        });
    }
     //Eliminar un servicio por Id
     async deleteServiceById(documentId: string) {
        return this.afs.collection('services').doc(documentId).delete();
    }

    getStatus(service: IService[]): any {
        let respuesta;
            if(service['status']=== 1){
                respuesta = 'Creado';
            }else
            if(service['status']=== 2){
                respuesta = 'Aceptado por conductor';
            }else
            if(service['status']=== 3){
                respuesta = 'Carga recogida y en camino a entregar';
            }else
            if(service['status']=== 4){
                respuesta = 'Carga entregada';
            }else
            if(service['status']=== 5){
                respuesta = 'Pagado. El usuario realizó el pago y calificó el servicio';
            }
            if(service['status']=== 6){
                respuesta = 'Programado';
            }else
            if(service['status']=== 7){
                respuesta = 'Programado. Aceptado por conductor';
            }else
            if(service['status']=== 8){
                respuesta = 'Cancelado';
            }else
            if(service['status']=== 9){
                respuesta = 'Solicitudes pérdidas';
            }else{
                respuesta = 'Sin estado';
            }
        return respuesta;
    }
}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DriversFirebaseService {

  constructor(private afs: AngularFirestore) {}

   //Traer todos los conductores
   getDriver(): any {
    return this.afs.collection('drivers').snapshotChanges();
}

  //Traer conductores por tipo de vehiculo
   getDriverByType(typeVehicle: string): any {
     const respData =  this.afs.collection('drivers',
     ref => ref.where('busy','==',false));
     return respData.snapshotChanges();
  }
}

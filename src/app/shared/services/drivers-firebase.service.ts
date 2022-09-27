import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DriversFirebaseService {

  constructor(private afs: AngularFirestore) { }

  public getDrivers(){
    return this.afs.collection('drivers').snapshotChanges();
  }
  public updateDrivers(documentId: string, data: any){
    return this.afs.collection('drivers').doc(documentId).set(data);
  }
}

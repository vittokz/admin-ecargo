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
  async updateDrivers(documentId: string, data: any){        
    await this.afs.collection('drivers').doc(documentId).update({
      'profile_info.names': data['names'],
      'profile_info.last_names': data['last_names'],
      'profile_info.phone': data['phone'],
      'profile_info.emg_phone1': data['emg_phone1'],
      'profile_info.emg_phone2': data['emg_phone2'],
      'profile_info.email': data['email'],      
  });
  return 'success';
  }
}

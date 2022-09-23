/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root',
})
export class UsersFirebaseService {
    constructor(private afs: AngularFirestore) {}

    getUsers(): any {
        return this.afs.collection('users').snapshotChanges();
    }

    //Actualiza un usuario segun su ID
    async updateUser(documentId: string, data: any) {
        await this.afs.collection('users').doc(documentId).update({
            'profile_info.names': data['names'],
            'profile_info.last_names': data['last_names'],
            'profile_info.email': data['email'],
            'profile_info.phone': data['phone']
          });
    return 'success';
    // const collectionUsers= this.afs.collection('users');
    // collectionUsers.doc(documentId).update({'profile_info.names': data.names}).then((respuesta)=>{
    //     console.log('res',respuesta);
    // });
    // //return this.afs.collection('users').doc(documentId).set(data);

  }
}

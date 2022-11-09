/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    constructor(private afs: AngularFirestore) {}
    //trae los usuarios con su billetera
    getPayments(): any {
        return this.afs.collection('payments').snapshotChanges();
    }
    //Traer pagos por Id de usuario
    getPaymentsById(documentIdUser: string): any {
        const respData = this.afs.collection('payments', (ref) =>
            ref.where('users_info.client_uid', '==', documentIdUser)
        );
        return respData.snapshotChanges();
    }
}

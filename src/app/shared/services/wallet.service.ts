/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class WalletService {

    constructor(private afs: AngularFirestore) {}
    //trae los usuarios con su billetera
    getWallets(): any {
        return this.afs.collection('users').snapshotChanges();
    }
    //actualiza el campo wallet
    async updateValorWalletUser(documentId: string, newValWallet: number) {
      await this.afs.collection('users').doc(documentId).update({
          'wallet': newValWallet,
      });
      return 'success';
  }
}

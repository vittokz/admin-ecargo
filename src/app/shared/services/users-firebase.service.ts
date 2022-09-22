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
}

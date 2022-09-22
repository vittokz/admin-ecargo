import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HttpClient,
  ) { }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  signIn(email: string, password: string): any {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('ingreso', result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}

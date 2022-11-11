/* eslint-disable arrow-parens */
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
      .then((result) =>
        result.user
      )
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //devolver en token almacenado
  getTokenGenerado(): any {
    return localStorage.getItem('token');
  }
  //Almacenar el token despues de login correcto
  setTokenGenerado(token: string): void {
     localStorage.setItem('token',token);
  }
  //Almacenar uid del usuario logueado
  setUidUser(uidUser: string): void {
    localStorage.setItem('uidUser',uidUser);
 }
 //devolver uid del usuario logueado
 getUidUser(): any {
  return localStorage.getItem('uidUser');
}

  //eliminar el token de localStorage
  removeTokenGenerado(): void {
    localStorage.removeItem('token');
 }
   //eliminar dataservices de localStorage
   removeDataServicesMasivo(): void {
    localStorage.removeItem('dataMasiva');
 }
}

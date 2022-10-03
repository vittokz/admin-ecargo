/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService  {

  constructor(
    private storage: AngularFireStorage
  ) { }

  //metodo para subir archivo
   subirArchivoCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
   referenciaCloudStorage(nombreArchivo: string){
     return this.storage.ref(nombreArchivo);
  }
}
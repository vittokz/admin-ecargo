/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUserFirebase } from '../models/user.model';
@Injectable({
    providedIn: 'root',
})
export class UsersFirebaseService {
    constructor(private afs: AngularFirestore) {}

    //Traer todos los usuarios
    getUsers(): any {
        return this.afs.collection('users').snapshotChanges();
    }

    //Traer un usuario por Id
    async getUserById(documentId: string) {
        return this.afs.collection('users').doc(documentId).valueChanges();
    }
    //Traer un usuario por email
    async getUserByEmail(email: string) {
        return this.afs.collection('users').doc(email).valueChanges();
    }

    //Actualiza un usuario segun su ID
    async updateUser(documentId: string, data: any) {
        await this.afs.collection('users').doc(documentId).update({
            'profile_info.names': data['names'],
            'profile_info.last_names': data['last_names'],
            'profile_info.email': data['email'],
            'profile_info.phone': data['phone'],
            'profile_info.photo_url': data['photo_url'],
            'enable': data['enable'],
        });
        return 'success';
    }

     //Actualiza photo-perfil de usuario segun su ID
     async updatePhotoPerfilUser(documentId: string, data: any) {
        await this.afs.collection('users').doc(documentId).update({
            'profile_info.names': data['names'],
            'profile_info.last_names': data['last_names'],
            'profile_info.email': data['email'],
            'profile_info.phone': data['phone'],
            'enable': data['enable'],
        });
        return 'success';
    }

    //Agregar un usuario a la base de datos
    async insertUser(data: IUserFirebase) {
        return new Promise<any>((resolve, reject) => {
            this.afs
                .collection('users')
                .add(data)
                .then(
                    (response) => 'success',
                    (error) => {
                        reject(error);
                    }
                );
        });
    }
     //Eliminar un usuario por Id
     async deleteUserById(documentId: string) {
        return this.afs.collection('users').doc(documentId).delete();
    }

     //Actualiza estado enable del usuario
     async updateEstadoUser(documentId: string) {
        await this.afs.collection('users').doc(documentId).update({
            'enable': false,
        });
        return 'success';
    }
}

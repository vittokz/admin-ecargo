/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { IUser, IUserFirebase } from 'app/shared/models/user.model';
import { UsersFirebaseService } from 'app/shared/services/users-firebase.service';
import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';
import { FirebaseStorageService } from 'app/shared/services/storage-firebase.service';



@Component({
    selector: 'dialog-user',
    templateUrl: './dialog-user.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }

            .img_photo_url {
                display: block;
                margin: auto;
                width: 90px !important;
                height: 90px !important;
                border-radius: 5px;
            }
            .order_upload_photo_url{
                border: 1px solid rgb(16, 122, 221) !important;
                padding: 8px;
                display:flex;
                flex-direction: column;
                align-items:center;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
    formFieldHelpers: string[] = [''];
    formEditarUsuario: FormGroup;
    formAgregarUsuario: FormGroup;
    usersEditado: IUser;
    usersNuevo: IUserFirebase;
    urlPerfilUsuario: string = '';
    estadoInicialUsuario: boolean;
    file: File;
    /**
     * Constructor
     */
    constructor(
        private storage: AngularFireStorage,
        private firebaseStorage: FirebaseStorageService,
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private formBuild: FormBuilder,
        private usersFirebaseServcice: UsersFirebaseService
    ) {
        if (data.title === 'Editar Usuario') {
            this.usersEditado = {
                names: '',
                last_names: '',
                phone: '',
                email: '',
                enable: data['enable'] as boolean,
            };
            this.crearFormularioEditarUsuario();
        } else if (data.title === 'Agregar Usuario') {
            this.usersNuevo = {
                agreement: {},
                creation_date: new Date(),
                enable: true,
                notification_id: '',
                profile_info: {
                    email: '',
                    emg_phone: '',
                    last_names: '',
                    names: '',
                    phone: '',
                    photo_url: '',
                },
                save_addresses: [],
                user_fmasivo: false,
                wallet: 0.0,
            };
            this.crearFormularioAgregarUsuario();
        }
    }

    onFileSelect(event): void {
        
        if (event.target.files.length > 0) {
          this.file = event.target.files[0];
        }
        const filePath = this.file.name;
        // Crea una referencia de acceso
        let referencia = this.firebaseStorage.referenciaCloudStorage(filePath);
            let tarea = this.firebaseStorage.tareaCloudStorage(filePath, this.file);

            //Cambia el porcentaje
            tarea.percentageChanges().subscribe((porcentaje) => {
    
            });

            referencia.getDownloadURL().subscribe((URL) => {
            console.log('URL',URL);
            });
      }

    crearFormularioEditarUsuario(): void {
        this.formEditarUsuario = this.formBuild.group({
            nombres: ['', Validators.required],
            apellidos: ['', [Validators.required]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
                    ),
                ],
            ],
            estado: ['', Validators.required],
            movil: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(13),
                    Validators.minLength(13),
                    //  Validators.pattern('^[0-9]+$'),
                ],
            ],
        });
        this.agregarDatosFormularioEditar(this.data);
    }

    crearFormularioAgregarUsuario(): void {
        this.formAgregarUsuario = this.formBuild.group({
            nombres: ['', Validators.required],
            apellidos: ['', [Validators.required]],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(
                        '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
                    ),
                ],
            ],
            estado: ['', Validators.required],
            movil: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(13),
                    Validators.minLength(13),
                ],
            ],
            movilEmergencia: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(13),
                    Validators.minLength(13),
                    // Validators.pattern('^[0-9]+$'),
                ],
            ],
        });
    }

    agregarDatosFormularioEditar(data): void {
        this.estadoInicialUsuario = data.enable;
        this.urlPerfilUsuario = data.photo_url;
        this.formEditarUsuario.get('nombres').setValue(data.names);
        this.formEditarUsuario.get('apellidos').setValue(data.last_names);
        this.formEditarUsuario.get('email').setValue(data.email);
        this.formEditarUsuario.get('movil').setValue(data.phone);
        this.formEditarUsuario.get('estado').setValue(data.enable);
    }
    //METODO PARA EDITAR USUARIO
    editarUsuarios(): void {
        const frm = this.formEditarUsuario.value;
        this.usersEditado['names'] = frm.nombres;
        this.usersEditado['last_names'] = frm.apellidos;
        this.usersEditado['email'] = frm.email;
        this.usersEditado['phone'] = frm.movil;
        this.usersEditado['enable'] = frm.estado === 'true' ? true : false;
        this.usersFirebaseServcice.updateUser(
            this.data['id'],
            this.usersEditado
        );
    }

    //METODO PARA AGREGAR USUARIO
    agregarUsuario(): void {
        const frm = this.formAgregarUsuario.value;
        this.usersNuevo['profile_info']['names'] = frm.nombres;
        this.usersNuevo['profile_info']['last_names'] = frm.apellidos;
        this.usersNuevo['profile_info']['email'] = frm.email;
        this.usersNuevo['profile_info']['phone'] = frm.movil;
        this.usersNuevo['profile_info']['emg_phone'] = frm.movilEmergencia;
        this.usersFirebaseServcice.insertUser(this.usersNuevo);
    }

    //METODO PARA ELIMINAR USUARIO
    EliminarUsuario(): void {
        this.usersFirebaseServcice.updateEstadoUser(this.data['id']);
    }
}

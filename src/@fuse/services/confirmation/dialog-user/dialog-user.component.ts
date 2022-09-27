/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { IUser, IUserFirebase } from 'app/shared/models/user.model';
import { UsersFirebaseService } from 'app/shared/services/users-firebase.service';
import { isBuffer } from 'lodash';

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
    estadoInicialUsuario: boolean;
    /**
     * Constructor
     */
    constructor(
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
                enable: data['enable'] as boolean
            };
             this.crearFormularioEditarUsuario();
        } else if (data.title === 'Agregar Usuario') {
            this.usersNuevo = {
                agreement:{},
                creation_date: new Date(),
                enable: true,
                notification_id: '',
                profile_info: {
                    email: '',
                    emg_phone: '',
                    last_names: '',
                    names: '',
                    phone: '',
                    photo_url:''
                },
                save_addresses: [],
                user_fmasivo: false,
                wallet: 0.0,
            };
            this.crearFormularioAgregarUsuario();
        }
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
        this.usersEditado['enable'] = frm.estado==='true' ? true : false;
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
        console.log(this.data);
        this.usersFirebaseServcice.deleteUserById(this.data['id']);
    }
}

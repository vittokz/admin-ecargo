/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { IUser } from 'app/shared/models/user.model';
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
    formEditar: FormGroup;
    usersEditado: IUser;
    estadoInicialUsuario: boolean;
    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private formBuild: FormBuilder,
        private usersFirebaseServcice: UsersFirebaseService
    ) {
        this.usersEditado ={
          names :'',
          last_names: '',
          phone: '',
          email:''
        };
        this.crearFormulario();
    }

    crearFormulario(): void {
        this.formEditar = this.formBuild.group({
            nombres: ['', Validators.required],
            apellidos: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            estado: ['', Validators.required],
            movil: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(13),
                    Validators.minLength(13),
                ],
            ],
        });
        this.agregarDatosFormularioEditar(this.data);
    }

    agregarDatosFormularioEditar(data): void {
        this.estadoInicialUsuario = data.enable;
        this.formEditar.get('nombres').setValue(data.names);
        this.formEditar.get('apellidos').setValue(data.last_names);
        this.formEditar.get('email').setValue(data.email);
        this.formEditar.get('movil').setValue(data.phone);
        this.formEditar.get('estado').setValue(data.enable);
    }

    editarUsuarios(): void {
        const frm = this.formEditar.value;
        this.usersEditado['names'] = frm.nombres;
        this.usersEditado['last_names'] = frm.apellidos;
        this.usersEditado['email'] = frm.email;
        this.usersEditado['phone'] = frm.movil;
        this.usersFirebaseServcice
            .updateUser(this.data['id'], this.usersEditado);
    }
}

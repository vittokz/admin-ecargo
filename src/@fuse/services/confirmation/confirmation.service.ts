import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DialogComponent } from './dialog-user/dialog-user.component';
import { IUser } from 'app/shared/models/user.model';
import { DialogDetalleServiceComponent } from './dialog-detalle-service/dialog-detalle-service.component';
import { DialogEditarServiceComponent } from './dialog-editar-service/dialog-editar-service.component';
import { DialogEliminarServicioComponent } from './dialog-eliminar-service/dialog-eliminar-service.component';
import { DialogEliminarServicioMasivamenteComponent } from './dialog-eliminar-serviceMasivamente/dialog-eliminar-service-masivamente.component';

@Injectable()
export class FuseConfirmationService {
    private _defaultConfig: FuseConfirmationConfig = {};

    /**
     * Constructor
     */
    constructor(private _matDialog: MatDialog) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    open(config: IUser, tipoAccion: string): MatDialogRef<DialogComponent> {
        // Merge the user config with the default config
        if (tipoAccion === 'editar-user') {
            this.crearConfiguracionDialog('Editar Usuario','heroicons_outline:pencil');
        } else if (tipoAccion === 'agregar-user') {
            this.crearConfiguracionDialog('Agregar Usuario','heroicons_outline:user-add');
        } else if (tipoAccion === 'eliminar-user') {
            this.crearConfiguracionDialog('Eliminar Usuario','heroicons_outline:x');
        }
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
    openDialogDetalleServicio(config: IUser, tipoAccion: string): MatDialogRef<DialogDetalleServiceComponent> {
        this.crearConfiguracionDialog('Ver detalle del servicio','heroicons_outline:eye');
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogDetalleServiceComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '800px',
            width: '1000px',
        });
    }

    //eliminar servicio
    openEliminarServicio(config: any, tipoAccion: string): MatDialogRef<DialogEliminarServicioComponent> {
        // Merge the user config with the default config
        this.crearConfiguracionDialog('Eliminar servicio','heroicons_outline:x');
        const userConfig = merge({}, this._defaultConfig, config);


        // Open the dialog
        return this._matDialog.open(DialogEliminarServicioComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }

    //
    //eliminar servicios masivamente
    openEliminarServicioMasivamente(config: any, tipoAccion: string): MatDialogRef<DialogEliminarServicioMasivamenteComponent> {
        // Merge the user config with the default config
        this.crearConfiguracionDialog('Eliminar servicios','heroicons_outline:x');
        const userConfig = merge({}, this._defaultConfig, config);


        // Open the dialog
        return this._matDialog.open(DialogEliminarServicioMasivamenteComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }

    //editar servicio
    openDialogEditarServicio(config: IUser, tipoAccion: string): MatDialogRef<DialogEditarServiceComponent> {
        this.crearConfiguracionDialog('Editar servicio','heroicons_outline:eye');
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogEditarServiceComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '800px',
            width: '1000px',
        });
    }
    crearConfiguracionDialog(title: string,icono: string): void {
        this._defaultConfig = {
            title: title,
            message: '',
            icon: {
                show: true,
                name:
                    icono,
                color: title !== 'Editar Usuario' ? 'warn' : 'success',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Aceptar',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'Cancelar',
                },
            },
            dismissible: true,
        };
    }
}

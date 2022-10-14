import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DialogComponent } from './dialog-user/dialog-user.component';
import { IUser } from 'app/shared/models/user.model';
import { DialogDetalleServiceComponent } from './dialog-detalle-service/dialog-detalle-service.component';
import { DialogDrivers } from './dialog-drivers/dialog_drivers.component';

@Injectable()
export class FuseConfirmationService
{
    private _defaultConfig: FuseConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn'
            },
            cancel : {
                show : true,
                label: 'Cancel'
            }
        },
        dismissible: false
    };

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
}

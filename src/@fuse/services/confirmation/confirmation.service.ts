import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { DialogComponent } from './dialog-user/dialog-user.component';
import { IUser } from 'app/shared/models/user.model';

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
            this.crearConfiguracionDialog('Editar Usuario');
        } else if (tipoAccion === 'agregar-user') {
            this.crearConfiguracionDialog('Agregar Usuario');
        } else if (tipoAccion === 'eliminar-user') {
            this.crearConfiguracionDialog('Eliminar Usuario');
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
    crearConfiguracionDialog(title: string): void {
        this._defaultConfig = {
            title: title,
            message: '',
            icon: {
                show: true,
                name:
                    title === 'Editar Usuario'
                        ? 'heroicons_outline:pencil'
                        : title === 'Agregar Usuario'
                        ? 'heroicons_outline:user-add'
                        : 'heroicons_outline:x',
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

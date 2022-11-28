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
import { DialogRejectDocument } from './dialog-reject-document/dialog_reject_document.component';
import { DialogDrivers } from './dialog-drivers/dialog_drivers.component';
import { VerImage } from './dialog-ver-imagen/dialog_ver_imagen.component';
import { DialogEditarWalletComponent } from './dialog-editar-wallet/dialog-editar-wallet.component';
import { DialogMovimientosWalletComponent } from './dialog-movimientos-wallet/dialog-movimientos-wallet.component';
import { DialogDetalleServiceMovimientoComponent } from './dialog-detalle-service-movimiento/dialog-detalle-service-movimiento.component';
import { DialogEditarCuponComponent } from './dialog-editar-cupon/dialog-editar-cupon.component';
import { DialogDetailsPayment } from './dialog-payment/dialog-payment.component';
import { DialogEditarVehicleComponent } from './dialog-editar-vehiculo/dialog-editar-vehicle.component';

@Injectable()
export class FuseConfirmationService {
    private _defaultConfig: FuseConfirmationConfig = {
        title: 'Confirm action',
        message: 'Are you sure you want to confirm this action?',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };
    private _driverConfig: FuseConfirmationConfig = {
        title: 'Confirm action',
        message: '',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };
    private _paymentConfig: FuseConfirmationConfig = {
        title: 'Detalles del Pago',            
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: false,
    };
    private _rejectDocumentConfig: FuseConfirmationConfig = {
        title: 'MOTIVO DE RECHAZO',
        message: 'Esta seguro de realizar esta accion?',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: 'Confirm',
                color: 'warn',
            },
            cancel: {
                show: true,
                label: 'Cancel',
            },
        },
        dismissible: false,
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
            this.crearConfiguracionDialog(
                'Editar Usuario',
                'heroicons_outline:pencil'
            );
        } else if (tipoAccion === 'agregar-user') {
            this.crearConfiguracionDialog(
                'Agregar Usuario',
                'heroicons_outline:user-add'
            );
        } else if (tipoAccion === 'eliminar-user') {
            this.crearConfiguracionDialog(
                'Eliminar Usuario',
                'heroicons_outline:x'
            );
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
    openDialogDetalleServicio(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogDetalleServiceComponent> {
        this.crearConfiguracionDialog(
            'Ver detalle del servicio',
            'heroicons_outline:eye'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogDetalleServiceComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '1200px',
            width: '1500px',
        });
    }

    //detalle service segun movimiento biletera seleccionado
    openDialogDetalleServicioMovimiento(
        config: any,
        tipoAccion: string
    ): MatDialogRef<DialogDetalleServiceMovimientoComponent> {
        this.crearConfiguracionDialog(
            'Ver detalle del servicio',
            'heroicons_outline:eye'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogDetalleServiceMovimientoComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '800px',
            width: '1000px',
        });
    }

    //eliminar servicio
    openEliminarServicio(
        config: any,
        tipoAccion: string
    ): MatDialogRef<DialogEliminarServicioComponent> {
        // Merge the user config with the default config
        this.crearConfiguracionDialog(
            'Eliminar servicio',
            'heroicons_outline:x'
        );
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
    openEliminarServicioMasivamente(
        config: any,
        tipoAccion: string
    ): MatDialogRef<DialogEliminarServicioMasivamenteComponent> {
        // Merge the user config with the default config
        this.crearConfiguracionDialog(
            'Eliminar servicios',
            'heroicons_outline:x'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(
            DialogEliminarServicioMasivamenteComponent,
            {
                autoFocus: false,
                disableClose: !userConfig.dismissible,
                data: userConfig,
                panelClass: 'fuse-confirmation-dialog-panel',
            }
        );
    }

    //editar servicio
    openDialogEditarServicio(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogEditarServiceComponent> {
        this.crearConfiguracionDialog(
            'Editar servicio',
            'heroicons_outline:eye'
        );
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

    //editar wallet/billetera
    openDialogEditarBilletera(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogEditarWalletComponent> {
        this.crearConfiguracionDialog(
            'Editar Wallet-Billetera',
            'heroicons_outline:pencil'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogEditarWalletComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '400px',
            width: '600px',
        });
    }

     //editar vehiculo
     openDialogEditarVehiculo(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogEditarVehicleComponent> {
        this.crearConfiguracionDialog(
            'Editar Vehiculo',
            'heroicons_outline:pencil'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogEditarVehicleComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '700px',
            width: '800px',
        });
    }

    //editar cupon
    openDialogEditarCupon(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogEditarCuponComponent> {
        this.crearConfiguracionDialog(
            'Editar Promoción.Cupón',
            'heroicons_outline:pencil'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogEditarCuponComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '600px',
            width: '800px',
        });
    }
    //visualizar movientos de wallet/billetera
    openDialogMovimientosBilletera(
        config: IUser,
        tipoAccion: string
    ): MatDialogRef<DialogMovimientosWalletComponent> {
        this.crearConfiguracionDialog(
            'Lista de Movimientos Wallet-Billetera',
            'heroicons_outline:eye'
        );
        const userConfig = merge({}, this._defaultConfig, config);

        // Open the dialog
        return this._matDialog.open(DialogMovimientosWalletComponent, {
            autoFocus: false,
            disableClose: !userConfig.dismissible,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
            height: '500px',
            width: '980px',
        });
    }
    crearConfiguracionDialog(title: string, icono: string): void {
        this._defaultConfig = {
            title: title,
            message: '',
            icon: {
                show: true,
                name: icono,
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

    //DRIVER
    openVerImagen(config: any, tipoAccion: number): MatDialogRef<VerImage> {
        const driverConfig = merge({ tipoAccion }, this._driverConfig, config);
        return this._matDialog.open(VerImage, {
            autoFocus: false,
            disableClose: !driverConfig.dismissible,
            data: driverConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
    openRejectDocument(config: any): MatDialogRef<DialogRejectDocument> {
        const driverConfig = merge({}, this._rejectDocumentConfig, config);
        return this._matDialog.open(DialogRejectDocument, {
            autoFocus: false,
            disableClose: !driverConfig.dismissible,
            data: driverConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
    openDriver(config: any, tipoAccion: string): MatDialogRef<DialogDrivers> {
        const driverConfig = merge({}, this._driverConfig, config);
        // Open the dialog
        return this._matDialog.open(DialogDrivers, {
            autoFocus: false,
            disableClose: !driverConfig.dismissible,
            data: driverConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
    //Verdetallespago-servicio
    openDetailsPayment(config: any, tipoAccion: string): MatDialogRef<DialogDetailsPayment> {
        const paymentConfig = merge({}, this._paymentConfig, config);
        // Open the dialog
        return this._matDialog.open(DialogDetailsPayment, {
            autoFocus: false,
            disableClose: !paymentConfig.dismissible,
            data: paymentConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
    }
}

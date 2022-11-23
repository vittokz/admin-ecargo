
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog-user/dialog-user.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'app/shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { DialogDetalleServiceComponent } from './dialog-detalle-service/dialog-detalle-service.component';
import { DialogEditarServiceComponent } from './dialog-editar-service/dialog-editar-service.component';
import { DialogEliminarServicioComponent } from './dialog-eliminar-service/dialog-eliminar-service.component';
import { DialogEliminarServicioMasivamenteComponent } from './dialog-eliminar-serviceMasivamente/dialog-eliminar-service-masivamente.component';
import { DialogDrivers } from './dialog-drivers/dialog_drivers.component';
import { VerImage } from './dialog-ver-imagen/dialog_ver_imagen.component';
import { DialogRejectDocument } from './dialog-reject-document/dialog_reject_document.component';
import { DialogEditarWalletComponent } from './dialog-editar-wallet/dialog-editar-wallet.component';
import { DialogMovimientosWalletComponent } from './dialog-movimientos-wallet/dialog-movimientos-wallet.component';
import { DialogDetalleServiceMovimientoComponent } from './dialog-detalle-service-movimiento/dialog-detalle-service-movimiento.component';


@NgModule({
    declarations: [
        FuseConfirmationDialogComponent,
        DialogComponent,
        DialogDetalleServiceComponent,
        DialogEditarServiceComponent,
        DialogEliminarServicioComponent,
        DialogEliminarServicioMasivamenteComponent,
        DialogDrivers,
        VerImage,
        DialogRejectDocument,
        DialogEditarWalletComponent,
        DialogMovimientosWalletComponent,
        DialogDetalleServiceMovimientoComponent
    ],
    imports     : [
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatMomentDateModule,
        MatSelectModule,
        FuseHighlightModule,
        MatDialogModule,
        SharedModule,
        CommonModule
    ],
    providers   : [
        FuseConfirmationService
    ]
})
export class FuseConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _fuseConfirmationService: FuseConfirmationService)
    {
    }
}


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


@NgModule({
    declarations: [
        FuseConfirmationDialogComponent,
        DialogComponent,
        DialogDetalleServiceComponent,
        DialogEditarServiceComponent,
        DialogEliminarServicioComponent,
        DialogEliminarServicioMasivamenteComponent
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
        SharedModule
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

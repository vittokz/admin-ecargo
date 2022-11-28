/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    Component,
    Inject,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';
import { AjustesSistemaService } from 'app/shared/services/ajustes-sistema.service';
import { CouponService } from 'app/shared/services/coupons.service';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { WalletService } from 'app/shared/services/wallet.service';

@Component({
    selector: 'dialog-editar-vechicle',
    templateUrl: './dialog-editar-vehicle.component.html',
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
            mat-form-field {
                width: 100% !important;
            }
            .content-image {
                display: flex;
                justify-content: center;
                width: 100% !important;
                &__image {
                    width: 60% !important;
                }
            }
            .order-items-conductor {
                display: flex;
                justify-content: space-around;
            }
            .order-items {
                display: flex;
                justify-content: start;
                &__content-origen {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(19, 112, 169, 0.2),
                        0 6px 20px 0 rgba(19, 112, 169, 0.2) !important;
                }
                &__content-destino {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(231, 36, 64, 0.2),
                        0 6px 20px 0 rgba(231, 36, 64, 0.2) !important;
                }
                &__content-detalle {
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                        0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
                }
                &__title {
                    font-weight: bold !important;
                    font-size: 16px;
                    color: black;
                    margin-bottom: 5px;
                }
            }
            .example-card {
                max-width: 100% !important;
                width:100% !important;
                display: block;
                margin: auto;
                padding: 8px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }

            .example-header-image {
                background-image: url('https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg');
                background-size: cover;
            }
            mat-panel-title {
                font-weight: bold !important;
                font-size: 16px;
            }
            mat-expansion-panel {
                border: 1px solid rgba(0, 0, 0, 0.2) !important;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                    0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
            }
            mat-expansion-panel-header {
                background-color: rgb(245, 243, 243);
            }
            strong {
                font-size: 15px;
                color: #323232;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class DialogEditarVehicleComponent implements OnInit {
    panelOpenState = false;
    formVehiculo: FormGroup;
    messageRepuesta: string='Se actualizo correctamente el vehiculo.';
    /**
     * Constructor
     */
    constructor(
        private fb: FormBuilder,
        private ajustesServicios: AjustesSistemaService,
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig
    ) {
    }

    ngOnInit(): void {
        this.crearFormulario();
    }

    crearFormulario(): void {
        this.formVehiculo = this.fb.group({
            category: ['', Validators.required],
            enable:[''],
            max_weight: ['', [Validators.required]],
            min_weight: ['', Validators.required],
            name: ['', [Validators.required]],
        });
        this.formVehiculo.get('category').setValue(this.data['category']);
        this.formVehiculo.get('max_weight').setValue(this.data['max_weight']);
        this.formVehiculo.get('min_weight').setValue(this.data['min_weight']);
        this.formVehiculo.get('name').setValue(this.data['name']);
    }
    //editar vehiculo
    editarVehiculo(): void{
        const frm = this.formVehiculo.value;
        this.ajustesServicios.updateVehiculo(frm);
    }
}

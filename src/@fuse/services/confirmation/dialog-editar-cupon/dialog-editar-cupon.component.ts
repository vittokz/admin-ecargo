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
import { CouponService } from 'app/shared/services/coupons.service';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { WalletService } from 'app/shared/services/wallet.service';

@Component({
    selector: 'dialog-editar-cupon',
    templateUrl: './dialog-editar-cupon.component.html',
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
                width: 100%;
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
                max-width: 90% !important;
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
export class DialogEditarCuponComponent implements OnInit {
    panelOpenState = false;
    formCoupon: FormGroup;
    messageRepuesta: string='Se actualizo correctamente el c´pón.';
    /**
     * Constructor
     */
    constructor(
        private fb: FormBuilder,
        private cuponService: CouponService,
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig
    ) {
    }

    ngOnInit(): void {
        this.crearFormulario();
    }

    crearFormulario(): void {
        this.formCoupon = this.fb.group({
            code: ['', Validators.required],
            description: ['', [Validators.required]],
            discount: ['', Validators.required],
            name: ['', [Validators.required]],
        });
        this.formCoupon.get('code').setValue(this.data['code']);
        this.formCoupon.get('description').setValue(this.data['description']);
        this.formCoupon.get('discount').setValue(this.data['discount']);
        this.formCoupon.get('name').setValue(this.data['name']);
    }
    //editar cupon
    editarWallet(): void{
        const frm = this.formCoupon.value;
        this.cuponService.updateCoupon(this.data['id'],frm);
    }
}

/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICoupon } from 'app/shared/models/coupon.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CouponService } from 'app/shared/services/coupons.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'app-main-promociones-bonos',
    templateUrl: './main-promociones-bonos.component.html',
    styleUrls: ['./main-promociones-bonos.component.scss'],
})
export class MainPromocionesBonosComponent implements OnInit {
    public listCoupons: ICoupon[] = [];
    displayedColumns: string[] = [
        'codigo',
        'fecha',
        'discount',
        'name',
        'acciones',
    ];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<ICoupon>;
    formCoupon: FormGroup;
    constructor(
        private couponService: CouponService,
        private _fuseConfirmationService: FuseConfirmationService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
    ) {}

    ngOnInit(): void {
        this.crearFormulario();
        this.couponService.getCoupons().subscribe((resp) => {
            this.listCoupons = [];
            resp.forEach((user, index) => {
                this.listCoupons.push({
                    no: index + 1,
                    id: user.payload.doc.id,
                    creation_date: user.payload.doc.data()['creation_date'],
                    code: user.payload.doc.data()['code'],
                    description: user.payload.doc.data()['description'],
                    discount: user.payload.doc.data()['discount'],
                    discount_type: user.payload.doc.data()['discount_type'],
                    enable: user.payload.doc.data()['enable'],
                    image_url: user.payload.doc.data()['image_url'],
                    name: user.payload.doc.data()['name'],
                });
            });
            this.dataSource = null;
            this.dataSource = new MatTableDataSource(this.listCoupons);
            this.dataSource.paginator = this.paginator;
        });
    }
    crearFormulario(): void {
        this.formCoupon = this.formBuilder.group({
            code: ['', Validators.required],
            creation_date:[''],
            description: ['', [Validators.required]],
            discount: ['', Validators.required],
            discount_type:[''],
            enable:[''],
            image_url:[''],
            name: ['', [Validators.required]],
        });
    }

    //registrar coupon
    registrarCoupon(): void{
      const date = new Date();
      const fecha = date.getFullYear() + '-'+ (date.getMonth()+1) + '-'+ date.getUTCDate();
      this.formCoupon.patchValue(
        {
          discount_type : 'amount',
          creation_date: fecha,
          image_url: '',
          enable: true
        }
      );
      this.couponService.insertCoupon(this.formCoupon.value).then((resp)=>{
        this._snackBar.open('Se registro Cupon correctamente!!!', '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
        });
        this.formCoupon.reset();
      });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    //Editar cupon
    editar(user): void {
        const dialogRef =
            this._fuseConfirmationService.openDialogEditarCupon(
                user,
                'editar-wallet'
            );
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._snackBar.open('Se editó correctamente el cupón.', '', {
                    duration: 2000,
                    panelClass: ['mat-toolbar', 'mat-primary'],
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                });
            }
        });
    }
}

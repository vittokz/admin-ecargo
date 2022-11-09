/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IService } from 'app/shared/models/service.model';
import { IUser } from 'app/shared/models/user.model';
import { WalletService } from 'app/shared/services/wallet.service';
@Component({
    selector: 'app-list-billetera',
    templateUrl: './list-billetera.component.html',
    styleUrls: ['./list-billetera.component.scss'],
})
export class ListBilleteraComponent implements OnInit {
    public infoUsersWallet: IUser[] = [];
    displayedColumns: string[] = ['names', 'wallet', 'estado', 'acciones'];
    message: string =
        'Se actualizo el valor de Wallet(Billetera) correctamente.';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<IUser>;
    constructor(
        private walletService: WalletService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar
    ) {
        this.cargarWalletUser();
    }

    ngOnInit(): void {}

    cargarWalletUser(): void {
        this.walletService.getWallets().subscribe((resp) => {
            this.infoUsersWallet = [];
            resp.forEach((user, index) => {
                this.infoUsersWallet.push({
                    no: index + 1,
                    id: user.payload.doc.id,
                    create: user.payload.doc
                        .data()
                        ['creation_date'].toDate()
                        .toLocaleDateString(),
                    //enable: user.payload.doc.data()['enable'],
                    enable: user.payload.doc.data()['enable'],
                    names: user.payload.doc.data()['profile_info']['names'],
                    photo_url:
                        user.payload.doc.data()['profile_info']['photo_url'],
                    last_names:
                        user.payload.doc.data()['profile_info']['last_names'],
                    phone: user.payload.doc.data()['profile_info']['phone'],
                    email: user.payload.doc.data()['profile_info']['email'],
                    wallet: user.payload.doc.data()['wallet'],
                });
            });
            this.dataSource = null;
            this.dataSource = new MatTableDataSource(this.infoUsersWallet);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    //Editar wallet
    editar(user): void {
        const dialogRef =
            this._fuseConfirmationService.openDialogEditarBilletera(
                user,
                'editar-wallet'
            );
        dialogRef.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this._snackBar.open(this.message, '', {
                    duration: 2000,
                    panelClass: ['mat-toolbar', 'mat-primary'],
                    horizontalPosition: 'right',
                    verticalPosition: 'bottom',
                });
            }
        });
    }
    //consultar movimientos de wallet
    verMovimientos(user): void {
        const dialogRef =
            this._fuseConfirmationService.openDialogMovimientosBilletera(
                user,
                'ver-movimientos-wallet'
            );
    }
}

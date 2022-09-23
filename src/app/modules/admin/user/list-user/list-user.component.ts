/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { UsersFirebaseService } from 'app/shared/services/users-firebase.service';
import { IUser } from 'app/shared/models/user.model';
import { Input, OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit, AfterViewInit {
    public infoUsers: IUser[] = [];
    message: string = 'Usuario actualizado correctamente.';
    configForm: UntypedFormGroup;
    displayedColumns: string[] = [
        'names',
        'last_names',
        'create',
        'email',
        'phone',
        'wallet',
        'acciones',
    ];
    dataSource: MatTableDataSource<IUser>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(
        private usersFirebase: UsersFirebaseService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.configForm = this._formBuilder.group({
            title: 'EDITAR INFORMACIÓN DE USUARIO',
            message: 'Modificar',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: false,
                    label: 'Remove',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: false,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });
        this.cargarUsers();
    }
    cargarUsers(): void {
        this.usersFirebase.getUsers().subscribe((resp) => {
            this.infoUsers = [];
            resp.forEach((user, index) => {
                this.infoUsers.push({
                    no: index + 1,
                    id: user.payload.doc.id,
                    create: user.payload.doc
                        .data()
                        ['creation_date'].toDate()
                        .toLocaleDateString(),
                    //enable: user.payload.doc.data()['enable'],
                    enable: user.payload.doc.data()['enable'],
                    names: user.payload.doc.data()['profile_info']['names'],
                    last_names:
                        user.payload.doc.data()['profile_info']['last_names'],
                    phone: user.payload.doc.data()['profile_info']['phone'],
                    email: user.payload.doc.data()['profile_info']['email'],
                    wallet: user.payload.doc.data()['wallet'],
                });
            });
            this.dataSource = null;
            this.dataSource = new MatTableDataSource(this.infoUsers);
        });
    }

    ngOnInit(): void {}

    editar(user): void {
        const dialogRef = this._fuseConfirmationService.open(
            user,
            'editar-user'
        );
        dialogRef.afterClosed().subscribe((result) => {
            this._snackBar.open(this.message, '', {
                duration: 2000,
                panelClass: ['mat-toolbar', 'mat-primary'],
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
            });
        });
        this.cargarUsers();
    }

    historial(user): void {
        console.log(user);
    }

    ngAfterViewInit(): void {
        this.dataSource = new MatTableDataSource(this.infoUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

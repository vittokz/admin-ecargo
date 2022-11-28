/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IAjustesSistema, VehiclesList } from 'app/shared/models/ajustes-sistema.model';
import { AjustesSistemaService } from 'app/shared/services/ajustes-sistema.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {
  public listCoupons: VehiclesList[] = [];
  displayedColumns: string[] = [
      'category',
      'name',
      'max_weight',
      'min_weight',
      'enable',
      'acciones',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<VehiclesList>;
  formVehiculo: FormGroup;
  public infoAjustes: IAjustesSistema[] = [];
  constructor(private formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private ajustesServicios: AjustesSistemaService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getVehicles();
  }
  getVehicles(): void {
    this.ajustesServicios.getVehiculos().subscribe((resp) => {
      resp.forEach((data) => {
          data.payload.doc.data();
          this.infoAjustes.push({
              app_info: data.payload.doc.data()['app_info'],
              contact_info: data.payload.doc.data()['contact_info'],
              platform_info: data.payload.doc.data()['platform_info'],
              required_documents:
                  data.payload.doc.data()['required_documents'],
              services_list: data.payload.doc.data()['services_list'],
              supported_max_volume:
                  data.payload.doc.data()['supported_max_volume'],
              supported_max_weight:
                  data.payload.doc.data()['supported_max_weight'],
              supported_min_weight:
                  data.payload.doc.data()['supported_min_weight'],
              vehicles_list: data.payload.doc.data()['vehicles_list'],
          });
      });
      this.dataSource = new MatTableDataSource(this.infoAjustes[0].vehicles_list);
      this.dataSource.paginator = this.paginator;
      console.log('vehicle',this.infoAjustes[0].vehicles_list);
  });
  }

  crearFormulario(): void {
    this.formVehiculo = this.formBuilder.group({
        category: ['', Validators.required],
        enable:[''],
        max_weight: ['', [Validators.required]],
        min_weight: ['', Validators.required],
        name: ['', [Validators.required]],
    });
}

registrarVehicle(): void{
  console.log(this.formVehiculo.value);
  this.ajustesServicios.insertVehiculo(this.formVehiculo.value);
}

applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
  }
}

//Editar vehiculo
editar(vehiculo): void {
  console.log(vehiculo);
  const dialogRef =
      this._fuseConfirmationService.openDialogEditarVehiculo(
        vehiculo,
          'editar-vehiculo'
      );
  dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
          this._snackBar.open('Vehiculo editado correctamente.', '', {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary'],
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
          });
      }
  });
}

}

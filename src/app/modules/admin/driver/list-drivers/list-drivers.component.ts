import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Drivers, Profile } from 'app/shared/model/driver.model';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DialogDrivers } from '@fuse/services/confirmation/dialog-drivers/dialog_drivers.component';
import _ from 'lodash';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListDriversComponent implements OnInit{
  formPersonal: FormGroup;
  changeform: boolean = false;
  dataDriverUpdate: Profile;
  disablebutton: boolean;
  infoDrivers = [];
  images = [];
  historyServices = [];
  message: string = 'Usuario actualizado correctamente.';
  data: {};
  dataDrivers = [];  
  displayedColumns: string[] = ['no', 'id', 'create', 'name', 'email', 'phone', 'avalible', 'action']; 
  dataSource = new MatTableDataSource<Drivers>();    
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  constructor(
    private drivers: DriversFirebaseService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _fuseConfirmationService: FuseConfirmationService,
    private route: ActivatedRoute
  ){           
    this.getDrivers();
  }
  ngOnInit(): void {         
    this.route.queryParams.subscribe(
      params => {
        this.data =  params['data'];        
      }
    )
  }
  

  initForm(){    
    this.formPersonal = this.formBuilder.group({
      names:      ['', [Validators.required]],
      last_names: ['', [Validators.required]],
      phone:      ['', [Validators.required]],
      emg_phone1: ['', [Validators.required]],
      emg_phone2: ['', [Validators.required]],
      email:      ['', [Validators.required]],
    })
  }

  deleteDriver(idDrivers: string): void{
    const dialogRef = this._fuseConfirmationService.openDriver(
      idDrivers, 
      'eliminar-driver'
    );
    dialogRef.afterClosed().subscribe((result) => {
      if(result==='confirmed'){
          this._snackBar.open('hola', '', {
              duration: 2000,
              panelClass: ['mat-toolbar', 'mat-primary'],
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
          });
      }
  });    
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDrivers, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  verDetalleServicio(service): void {
    const dialogRef = this._fuseConfirmationService.openDialogDetalleServicio(
        service,
        'ver-detalle'
    );
}
  
  getDrivers(){      
    this.initForm();    
    const data = this.drivers.getDrivers().subscribe((resp)=>{                     
      this.infoDrivers = [];
      this.dataDrivers = [];
      resp.forEach((driver, index)=>{  
        this.dataDrivers.push(driver.payload.doc.data());                   
          this.images.push({
            path: driver.payload.doc.data()['vehicle_info']['photos_urls'] ? driver.payload.doc.data()['vehicle_info']['photos_urls']: ''
          });              
        this.infoDrivers.push({
          no: index+1,
          id: driver.payload.doc.id,          
          create: (driver.payload.doc.data()['creation_date']).toDate().toLocaleDateString(),
          name: driver.payload.doc.data()['profile_info']['names'] +' '+ driver.payload.doc.data()['profile_info']['last_names'],
          email: driver.payload.doc.data()['profile_info']['email'],
          phone: driver.payload.doc.data()['profile_info']['phone'],
          avalible: driver.payload.doc.data()['busy']
        });        
      })
      this.dataSource = new MatTableDataSource<Drivers>(this.infoDrivers);
      this.dataSource.paginator = this.paginator; 
    });
  }
  getHistoryServices(idDriver: string ){
    console.log(idDriver);
    this.historyServices = [];
    let count = 0;
    const data = this.drivers.getDriversServices().subscribe((res) => {
      res.forEach((service, index) => {        
        if (service.payload.doc.data()['users_info']['driver_info']['uid'] == idDriver) {
          if (count < 5) {
            count++;
            this.historyServices.push(service.payload.doc.data());            
          }
        }
      });
      console.log(this.historyServices);
      this.historyServices.sort((a,b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
      
    })
  }
  agregarDatosFormularioEditar(index): void { 
    this.formPersonal.disable();                          
    this.formPersonal.get('names').setValue(this.dataDrivers[index]['profile_info'].names);
    this.formPersonal.get('last_names').setValue(this.dataDrivers[index]['profile_info'].last_names);
    this.formPersonal.get('phone').setValue(this.dataDrivers[index]['profile_info'].phone);
    this.formPersonal.get('emg_phone1').setValue(this.dataDrivers[index]['profile_info'].emg_phone1);
    this.formPersonal.get('emg_phone2').setValue(this.dataDrivers[index]['profile_info'].emg_phone2);
    this.formPersonal.get('email').setValue(this.dataDrivers[index]['profile_info'].email);
}
  updateDrivers(id: string){    
    if (this.changeform) {            
      const formulario = this.formPersonal.value;
      this.data = {
        names: formulario.names,
        last_names: formulario.last_names,
        phone: formulario.phone,
        emg_phone1: formulario.emg_phone1,
        emg_phone2: formulario.emg_phone2,
        email: formulario.email,
      }       
      this.drivers.updateDrivers(id, this.data).then(res => {      
        if (res === 'sucess') {
          this._snackBar.open(this.message, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this.getDrivers();        
        }
      });  
    }        
  }
  buttonDocument(driver){
    console.log(driver);    
  }
  editButton(){
    this.formPersonal.enable();
    this.disablebutton = false;
  }
  confirmEditButton(){
    this.formPersonal.disable();
    this.disablebutton = true;
  }
  
  @ViewChild (MatPaginator) paginador: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

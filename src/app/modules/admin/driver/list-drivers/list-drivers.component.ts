import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Drivers, Profile } from 'app/shared/model/driver.model';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class ListDriversComponent implements AfterViewInit {
  formPersonal: FormGroup;
  dataDriverUpdate: Profile;
  infoDrivers = [];
  data: {};
  dataDrivers = [];  
  displayedColumns: string[] = ['no', 'id', 'create', 'name', 'email', 'phone', 'avalible', 'action']; 
  dataSource = new MatTableDataSource<Drivers>();    
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  disableinput = true;
  
  constructor(private drivers: DriversFirebaseService, private formBuilder: FormBuilder) {        
    this.getDrivers();
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
  
  getDrivers(){      
    this.initForm();
    const data = this.drivers.getDrivers().subscribe((resp)=>{                     
      this.infoDrivers = [];
      resp.forEach((driver, index)=>{  
        this.dataDrivers.push(driver.payload.doc.data()); 
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
      console.log(this.dataDrivers);
      console.log(this.infoDrivers);
      this.dataSource = new MatTableDataSource<Drivers>(this.infoDrivers);
    });
  }
  agregarDatosFormularioEditar(index): void {                             
    this.formPersonal.get('names').setValue(this.dataDrivers[index]['profile_info'].names);
    this.formPersonal.get('last_names').setValue(this.dataDrivers[index]['profile_info'].last_names);
    this.formPersonal.get('phone').setValue(this.dataDrivers[index]['profile_info'].phone);
    this.formPersonal.get('emg_phone1').setValue(this.dataDrivers[index]['profile_info'].emg_phone1);
    this.formPersonal.get('emg_phone2').setValue(this.dataDrivers[index]['profile_info'].emg_phone2);
    this.formPersonal.get('email').setValue(this.dataDrivers[index]['profile_info'].email);
}
  updateDrivers(id: string){
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
      console.log(res);
      if (res === 'sucess') {
        this.getDrivers();
      }
      
    });  
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

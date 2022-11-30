import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ipayment } from 'app/shared/models/payment.model';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { PaymentService } from 'app/shared/services/payments.service';
import { IService } from 'app/shared/models/service.model';
import { SharedModule } from 'app/shared/shared.module';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {FormGroup, FormControl} from '@angular/forms';
import moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  }); 
  displayedColumns: string[] = ['fecha', 'usuario', 'conductor', 'total', 'cuota', 'Mpago', 'estado' , 'acciones'];
  selected = 'option0';
  loading: boolean = false;  
  public misPagos: Ipayment[] = []; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Ipayment>;
  indPagosE: number = 0;
  indPagosD: number = 0;
  porPagosE: number = 0;

  constructor(
    private payment: PaymentService,
    private servicesService: ServicesFirebaseService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.cargarPayments();
   }

  ngOnInit(): void {
    
  }
  cargarPayments(){
    this.loading = true;    
    this.payment.getPayments().subscribe((resp) => {            
      this.misPagos = [];
      this.indPagosE = 0;
      this.indPagosD = 0;

      resp.forEach((element) => {                        
        this.misPagos.push({   
          id: element.payload.doc.id,   
          fecha: element.payload.doc.data()['payment_date'].toDate().toLocaleDateString(),  
          usuario: element.payload.doc.data()['users_info']['client_uid'],
          conductor:  element.payload.doc.data()['users_info']['driver_uid'],
          total: element.payload.doc.data()['amount_details']['total_price'],
          cuota: element.payload.doc.data()['amount_details']['cuote'],
          Mpago: element.payload.doc.data()['payment_method'],
          estado: element.payload.doc.data()['status'],
          servicio: element.payload.doc.data()['service_uid'],
        });
        if (element.payload.doc.data()['transaction_data']['status'] == 'approved') {
          this.indPagosE++;
        }
        if (element.payload.doc.data()['transaction_data']['status'] == 'rejected') {
          this.indPagosD++;
        }
      });
      this.porPagosE = (this.misPagos.length / this.indPagosE) *100;
      
      this.misPagos.forEach((element, index)=>{
        this.servicesService.getServiceById(element.servicio).subscribe((elem: IService)=>{                                      
          if (elem) {
            element.usuario = elem.users_info['client_info']['name'];
            element.conductor = elem.users_info['driver_info']['name'];            
          }else{
            element.usuario = 'No Existe Informacion del servicio';
            element.conductor = 'No Existe Informacion del servicio';
          }         
          this.loading = false; 
        });              
      }); 
      this.ordenarXfechaDec();
      console.log('mis pagos', this.misPagos);
        
      this.dataSource = null;
      this.dataSource = new MatTableDataSource(this.misPagos);
      this.dataSource.paginator = this.paginator;
    });    
  }
  //verDetallePayment
  verDetallePayment(pago: string){
    const dialogRef = this._fuseConfirmationService.openDetailsPayment(pago, 'ver-detalle');
  }

  ordenarXfechaDec(){
    this.misPagos.sort((a, b) => {
      return Number(moment(b.fecha, 'DD/MM/YYYY').format('x')) - Number(moment(a.fecha, 'DD/MM/YYYY').format('x'))
     });
    if (this.range.value.start != null && this.range.value.end != null) {
      console.log('hoola');
      
      this.resetDate();
    } 
  }
  resetDate(){
    this.range.controls.start.reset();
    this.range.controls.end.reset();
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }  
  }
  newRange(rango){        
    let start = moment(rango.start).format('DD/MM/YYYY');
    let end = moment(rango.end).format('DD/MM/YYYY');
    this.dataSource = new MatTableDataSource(this.misPagos.filter(pago => (pago.fecha >= start && pago.fecha <= end && moment(rango.start).format('MM') == moment(pago.fecha, 'DD/MM/YYYY').format('MM') )));
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }        
  }
  filterXdia(){
    let hoy = moment().format('DD/MM/YYYY');
    this.dataSource = new MatTableDataSource(this.misPagos.filter(pago => pago.fecha == hoy));
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.ordenarXfechaDec(); 

        
  }
  filterXmes(){
    let mes = moment().format('MM');          
    this.dataSource =new MatTableDataSource(this.misPagos.filter(pago => moment(pago.fecha, 'DD/MM/YYYY').format('MM') == mes));
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.ordenarXfechaDec(); 
  }

  filterXanio(){
    let año = moment().format('YYYY');
    console.log(año);
    
    this.dataSource =new MatTableDataSource(this.misPagos.filter(pago => moment(pago.fecha, 'DD/MM/YYYY').format('YYYY') == año));
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.ordenarXfechaDec();
  }

}

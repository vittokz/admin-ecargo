import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {formatDate} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DocumentsDriverService } from 'app/shared/services/documents-driver.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  fecha = formatDate(new Date(), 'dd//MMyyyy', 'en');
  data = [];
  id: string;
  username: string;
  revisionDoc = [];
  documents_reject: {
    'Cédula del conductor': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    },
    'Licencia de conducción del conductor': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    },
    'Tarjeta de propiedad del vehiculo': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    },
    'Tarjeta de propiedad del trailer': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    },
    'Cédula del propietario del vehiculo': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    },
    'SOAT': {
      'estado': false,
      'fecha': '',
      'motivo': '',
    }
  };

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private documentServices: DocumentsDriverService,
    private serviceDriver: DriversFirebaseService,
    private _snackBar: MatSnackBar,
    private _fuseConfirmationService: FuseConfirmationService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {   
        this.revisionDoc = [];
        this.documentServices.getDocumnets(params['data']).subscribe((res)=>{          
          this.data = res.payload.data()['documents'];                           
          this.data.forEach((elem, index) => {
            if (elem.type == 'no-data') {
              this.data.splice(index, 1);          
            }
            this.revisionDoc.push({
              name: elem.name,
              type: elem.type,
              revision: true
            });
          });
        });                           
      });
      this._userService.user$.subscribe((user) => {
        this.id = user.id;
        this.username = user.name;
    }); 
  }

  verimagen(image: string, posicion: number){
    const dialogRef = this._fuseConfirmationService.openVerImagen(
      image, 
      posicion
    );
    
  }
  finalDoc(){
    
  }
  rechazar_document(data){
     const dialogRef = this._fuseConfirmationService.openRejectDocument(
      data
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
  backClicked() {
    this._location.back();
  }
}

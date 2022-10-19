import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DocumentsDriverService } from 'app/shared/services/documents-driver.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  data = [];
  revisionDoc = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private documentServices: DocumentsDriverService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {   
        this.revisionDoc = [];
        this.documentServices.getDocumnets(params['data']).subscribe((res)=>{          
          this.data = res.payload.data()['documents'];                           
          this.data.forEach((elem) => {
            this.revisionDoc.push({
              name: elem.name,
              type: elem.type,
              revision: true
            });
          });
        });                      
      });
      console.log(this.revisionDoc);
      
  }
  verimagen(image: string, posicion: number){
    console.log(image);
    
    const dialogRef = this._fuseConfirmationService.openVerImagen(
      image, 
      posicion
    );
  }
  backClicked() {
    this._location.back();
  }
}

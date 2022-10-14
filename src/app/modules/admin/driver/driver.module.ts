import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { DocumentsComponent } from './document-drivers/documents/documents.component';
import { DriverRoutingModule } from './driver-rounting.module';




@NgModule({
  declarations: [
    ListDriversComponent,
    DocumentsComponent
  ],
  imports: [    
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatRippleModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    IvyCarouselModule,
    DriverRoutingModule
    
  ]
})
export class DriverModule { }

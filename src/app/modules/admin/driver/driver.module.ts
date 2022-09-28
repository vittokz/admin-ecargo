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


const userRoutes: Route[] = [
  {
      path     : '',
      component: ListDriversComponent
  }
];


@NgModule({
  declarations: [
    ListDriversComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatRippleModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule
    
  ]
})
export class DriverModule { }

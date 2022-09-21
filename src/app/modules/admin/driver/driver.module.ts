import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

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
    SharedModule
  ]
})
export class DriverModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainReportesComponent } from './main-reportes/main-reportes.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const reportesRoutes: Route[] = [
  {
      path: '',
      component: MainReportesComponent,
  }
];

@NgModule({
  declarations: [
    MainReportesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(reportesRoutes)
  ]
})
export class ReportesModule { }

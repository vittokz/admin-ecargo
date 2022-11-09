import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBilleteraComponent } from './list-billetera/list-billetera.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const billeteraRoutes: Route[] = [
  {
      path: '',
      component: ListBilleteraComponent,
  },
];

@NgModule({
  declarations: [
    ListBilleteraComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(billeteraRoutes),
    SharedModule
  ]
})
export class BilleteraModule { }

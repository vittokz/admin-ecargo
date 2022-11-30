import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentsComponent } from './payments/payments.component';
import { Route, RouterModule } from '@angular/router';

const cargueRoutes: Route[] = [
  {
      path: '',
      component: PaymentsComponent,
  }
];

@NgModule({
  declarations: [
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(cargueRoutes),
  ]
})
export class PaymentsModule { }

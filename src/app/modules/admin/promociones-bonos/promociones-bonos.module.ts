import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPromocionesBonosComponent } from './main-promociones-bonos/main-promociones-bonos.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const promocionesRoutes: Route[] = [
  {
      path: '',
      component: MainPromocionesBonosComponent,
  }
];

@NgModule({
  declarations: [
    MainPromocionesBonosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(promocionesRoutes),
    SharedModule
  ]
})
export class PromocionesBonosModule { }

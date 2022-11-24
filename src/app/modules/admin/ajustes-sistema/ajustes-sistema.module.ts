import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MainAjustesSistemaComponent } from './main-ajustes-sistema/main-ajustes-sistema.component';

const ajustesRoutes: Route[] = [
  {
      path: '',
      component: MainAjustesSistemaComponent ,
  },
];

@NgModule({
  declarations: [
    MainAjustesSistemaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ajustesRoutes),
    SharedModule
  ]
})
export class AjustesSistemaModule { }

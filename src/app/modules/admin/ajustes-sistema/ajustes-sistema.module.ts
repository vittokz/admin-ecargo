import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MainAjustesSistemaComponent } from './main-ajustes-sistema/main-ajustes-sistema.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { TiposCargaComponent } from './tipos-carga/tipos-carga.component';

const ajustesRoutes: Route[] = [
  {
      path: '',
      component: MainAjustesSistemaComponent ,
  },
  {
    path: 'vehiculos',
    component: VehiculosComponent ,
},
{
  path: 'tipos-carga',
  component: TiposCargaComponent ,
},
];

@NgModule({
  declarations: [
    MainAjustesSistemaComponent,
    VehiculosComponent,
    TiposCargaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ajustesRoutes),
    SharedModule
  ]
})
export class AjustesSistemaModule { }

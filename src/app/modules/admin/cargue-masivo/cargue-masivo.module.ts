import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCargueMasivoComponent } from './main-cargue-masivo/main-cargue-masivo.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';


const cargueRoutes: Route[] = [
  {
      path: '',
      component: MainCargueMasivoComponent,
  }
];

@NgModule({
  declarations: [
    MainCargueMasivoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(cargueRoutes),
    SharedModule
  ]
})
export class CargueMasivoModule { }

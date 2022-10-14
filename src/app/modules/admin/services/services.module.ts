import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListServicesComponent } from './list-services/list-services.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const serviceRoutes: Route[] = [
  {
      path     : '',
      component: ListServicesComponent
  },
  {
    path     : 'create-service',
    component: CreateServiceComponent
}
];

@NgModule({
  declarations: [
    ListServicesComponent,
    CreateServiceComponent
  ],
  imports: [
    RouterModule.forChild(serviceRoutes),
    CommonModule,
    SharedModule
  ]
})
export class ServicesModule { }

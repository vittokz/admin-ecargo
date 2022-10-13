import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListServicesComponent } from './list-services/list-services.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListServicesAllComponent } from './list-services-all/list-services-all.component';

const serviceRoutes: Route[] = [
    {
        path: '',
        component: ListServicesComponent,
    },
    {
        path: 'create-service',
        component: CreateServiceComponent,
    },
    {
      path: 'all-services',
      component: ListServicesAllComponent,
  },
];

@NgModule({
    declarations: [
        ListServicesComponent,
        CreateServiceComponent,
        ListServicesAllComponent,
    ],
    imports: [RouterModule.forChild(serviceRoutes), CommonModule, SharedModule],
})
export class ServicesModule {}

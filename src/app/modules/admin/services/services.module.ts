import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListServicesComponent } from './list-services/list-services.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { ListServicesAllComponent } from './list-services-all/list-services-all.component';
import { ServiceIdComponent } from './service-id/service-id.component';
import { ServicesActivesComponent } from './services-actives/services-actives.component';

const serviceRoutes: Route[] = [
    {
        path: '',
        component: ListServicesComponent,
    },
    {
        path: 'serviceId',
        component: ServiceIdComponent,
    },
    {
        path: 'actives',
        component: ServicesActivesComponent,
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
        ServiceIdComponent,
        ServicesActivesComponent,
    ],
    imports: [RouterModule.forChild(serviceRoutes), CommonModule, SharedModule],
})
export class ServicesModule {}

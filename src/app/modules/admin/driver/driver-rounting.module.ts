import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './document-drivers/documents/documents.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';

const routes: Routes = [
    {
        path: '',
        component: ListDriversComponent,
    },
    {
        path: 'documents',
        component: DocumentsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DriverRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';


const userRoutes: Route[] = [
  {
      path     : '',
      component: ListUserComponent
  },
  {
    path     : 'create-user',
    component: CreateUserComponent
}
];

@NgModule({
  declarations: [
    ListUserComponent,
    CreateUserComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }

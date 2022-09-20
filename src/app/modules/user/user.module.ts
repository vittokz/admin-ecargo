import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { Route, RouterModule } from '@angular/router';

const userRoutes : Route[] = [
  {
    path:'',
    component: ListUserComponent
  }
];

@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule
  ]
})
export class UserModule { }

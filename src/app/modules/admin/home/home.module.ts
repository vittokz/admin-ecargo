import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route,RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const homeRoutes: Route[] = [
  {
      path     : '',
      component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(homeRoutes),
    CommonModule,
    SharedModule
  ]
})
export class HomeModule { }

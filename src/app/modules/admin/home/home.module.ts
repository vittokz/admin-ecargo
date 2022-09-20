import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route,RouterModule } from '@angular/router';

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
    CommonModule
  ]
})
export class HomeModule { }

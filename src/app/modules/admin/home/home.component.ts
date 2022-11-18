import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IService } from 'app/shared/models/service.model';
import { IUser } from 'app/shared/models/user.model';
import { AuthFirebaseService } from 'app/shared/services/auth-firebase.service';
import { DriversFirebaseService } from 'app/shared/services/drivers-firebase.service';
import { ServicesFirebaseService } from 'app/shared/services/services-firebase.service';
import { UsersFirebaseService } from 'app/shared/services/users-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listServices: IService[] = [];
  listUsers: IUser[] = [];
  listDrivers = [];
  constructor(private ruta: Router, private servicesService: ServicesFirebaseService,
    private usersFirebase: UsersFirebaseService,
    private drivers: DriversFirebaseService,) {
    this.getServices();
    this.getUsuarios();
    this.getConductores();
  }
  getConductores(): void {
    this.drivers.getDrivers().subscribe((resp)=>{
      this.listDrivers = resp;
    });
  }
  getUsuarios(): void {
    this.usersFirebase.getUsers().subscribe(
      (resp)=>{
        this.listUsers = resp;
      }
    );
  }

  ngOnInit(): void {
  }
  getServices(): void {
    this.servicesService.getServices().subscribe(
      (resp)=>{
        this.listServices = resp;
      }
    );
  }

  irServicios(): void{
    this.ruta.navigateByUrl('/services/all-services');
  }

  irBilletera(): void{
    this.ruta.navigateByUrl('/billetera');
  }
  irConductor(): void{
    this.ruta.navigateByUrl('/driver');
  }
  irUsuarios(): void{
    this.ruta.navigateByUrl('/user');
  }

  irCargueMasivo(): void{
    this.ruta.navigateByUrl('/cargue-masivo');
  }

  irReportes(): void{
    this.ruta.navigateByUrl('/reportes');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../../../shared/services/auth-firebase.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authSvc: AuthFirebaseService) {
    // this.authSvc.afAuth.authState.subscribe((auth) => {
    //   if (auth === null) {
    //     console.log('Not Logged in.');
    //     this.router.navigate(['login']);
    //     //   this.isLoggedIn = false;
    //   }
    // });
   }

  ngOnInit(): void {
  }

  login(correo, clave){
    console.log(correo, clave);
    this.authSvc.SignIn(correo, clave).then(res => {
      console.log(res);
      
    })
  }

}

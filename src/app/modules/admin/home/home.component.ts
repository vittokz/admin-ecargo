import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'app/shared/services/auth-firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}

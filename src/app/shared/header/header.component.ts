import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              public router: Router) {
    this.authService.decodeToken();
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.authService.logOut();
  }

}

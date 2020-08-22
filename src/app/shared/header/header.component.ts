import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuarioI } from '../../models/usuario-i';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public loggedUser: UsuarioI;

  constructor(public authService: AuthService,
              public usrService: UsuariosService,
              public router: Router) {
                this.getLoggedUser();
   }

  ngOnInit(): void {
    this.authService.getUid();
    this.getLoggedUser();
  }

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigateByUrl('/login');
  }

  getLoggedUser(){
    this.usrService.getUsuario(this.authService.logedUsrID)
        .subscribe((res: any)=>{
          this.usrService.loggedUsr = res.usuario;
        }, err => {
          console.log(err);
        });
  }
}

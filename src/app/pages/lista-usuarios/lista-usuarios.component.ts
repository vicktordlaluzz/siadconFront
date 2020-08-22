import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { UsuarioI } from '../../models/usuario-i';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styles: [
  ]
})
export class ListaUsuariosComponent implements OnInit {

  p: number = 1;
  public usuarios: UsuarioI[];
  constructor(private usrService: UsuariosService) {
    this.getUsuarios();
   }

  ngOnInit(): void {
  }

  getUsuarios(){
    this.usrService.getUsuarios()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
      });
  }

  deleteUsuario(event: Event,usuario){
    event.preventDefault();
    Swal.fire({
      title: 'Estas seguro?',
      text: "Una vez eliminado se perderan todos los datos del usuario permanentemente!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.usrService.deleteUsuario(usuario)
        .subscribe((resp: any) => {
          this.getUsuarios();
          Swal.fire(
            'Usuario eliminado!',
            resp.msg,
            'success'
          );
        }, error => {
          console.log(error);
        });
      }
    });
  }

}

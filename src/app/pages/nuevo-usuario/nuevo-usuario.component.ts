import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DireccionesService } from '../../services/direcciones.service';
import { UsuariosService } from '../../services/usuarios.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(public fb: FormBuilder,
              public direcService: DireccionesService,
              private usrService: UsuariosService,
              private router: Router) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.usuarioForm = this.fb.group({
      nombre: ['test', Validators.required],
      apaterno: ['test', Validators.required],
      amaterno: ['test'],
      rfc: ['rolv920831r51', [Validators.required,Validators.minLength(12), Validators.maxLength(13)]],
      curp: ['rolv920831roioie98', [Validators.required,Validators.minLength(18), Validators.maxLength(18)]],
      email: ['vicktordlaluzz@gmail.com', [Validators.required,Validators.email]],
      puesto: ['contador', Validators.required],
      calle: ['gladiola', Validators.required],
      numeroE: ['4702'],
      numeroI: [''],
      colonia: ['puerta del sol', Validators.required],
      estado: ['puebla', Validators.required],
      municipio: ['tehuacan', Validators.required],
      telefono: ['2382236776', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]]
    })
  }

  saveUsr(event: Event){
    event.preventDefault();
    this.usuarioForm.markAllAsTouched();
    if(this.usuarioForm.valid){
      let usuario = this.usuarioForm.value;
      console.log(usuario);
      this.usrService.createUsuario(usuario)
          .subscribe((resp: any) => {
            Swal.fire(
              'Bien!!',
              resp.msg,
              'success'
            );
            this.resetForm();
            this.router.navigate(['/dashboard/administrador/listaUsuarios'])

          },(error)=>{
            console.log(error);
            Swal.fire(
              'Uuuups!!!',
              error.error.msg,
              'error'
            )
          });
    }
  }

  resetForm(){
    this.usuarioForm.reset();
  }
  selectMunicipios(){
    const municipio = this.usuarioForm.controls.estado.value;
    this.direcService.getMunicipios(municipio);
  }
}

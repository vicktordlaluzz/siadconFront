import { Component, OnInit, ɵgetComponentViewDefinitionFactory } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
import { UsuariosService } from '../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DireccionesService } from '../../services/direcciones.service';
import { UsuarioI } from '../../models/usuario-i';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public loggedUsr: UsuarioI;
  usuarioForm: FormGroup;
  changePassForm: FormGroup;
  changePass = false
  editar = false;
  estados = null;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public usrService: UsuariosService,
              public direcService: DireccionesService) {
    this.getLoggedUsr();
    this.buildForm();
               }

  ngOnInit(): void {
  }


  async selImg(){
    const { value: file } = await Swal.fire({
      title: 'Seleccionar imagen',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    });

    if(file){
      this.usrService.cargarImg(this.usrService.loggedUsr._id, file)
          .subscribe((res: any) => {
            this.getLoggedUsr();
            Swal.fire({
              icon: 'success',
              title: res.msg.toUpperCase(),
              showConfirmButton: false
            });
          }, err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: err.msg,
              showConfirmButton: false
            });
          });
    }
  }

  getLoggedUsr(){
    this.usrService.getUsuario(this.authService.logedUsrID)
        .subscribe((res: any)=>{
          this.usrService.loggedUsr = res.usuario;
        }, err => {
          console.log(err);
        });
  }

  editarUsuario(){
    this.editar = !this.editar;
    
    this.chargeForm();
  }

  buildForm(){
    this.usuarioForm = this.fb.group({
      nombre: [``, Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      rfc: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(13)]],
      curp: ['', [Validators.required,Validators.minLength(18), Validators.maxLength(18)]],
      email: ['', [Validators.required,Validators.email]],
      calle: ['', Validators.required],
      numeroE: [''],
      numeroI: [''],
      colonia: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]]
    });

    this.changePassForm = this.fb.group({
      pass: [``, Validators.required],
      pass2: [``, Validators.required],
    })
  }

  selectMunicipios(){
    const municipio = this.usuarioForm.controls.estado.value;
    this.direcService.getMunicipios(municipio);
  }

  saveChanges(event: Event){
    this.usrService.updateUsuario(this.usrService.loggedUsr._id, this.usuarioForm.value)
        .subscribe((res: any) => {
          this.usrService.getUsuarios();
          Swal.fire({
            icon: 'success',
            title: res.msg.toUpperCase(),
            showConfirmButton: false
          });
          this.editar = !this.editar;
          this.getLoggedUsr();
        }, err => console.log(err)
        )

  }

  chargeForm(){
    this.usuarioForm.controls.nombre.setValue(this.usrService.loggedUsr.nombre);
    this.usuarioForm.controls.apaterno.setValue(this.usrService.loggedUsr.apaterno);
    this.usuarioForm.controls.amaterno.setValue(this.usrService.loggedUsr.amaterno);
    this.usuarioForm.controls.rfc.setValue(this.usrService.loggedUsr.rfc);
    this.usuarioForm.controls.curp.setValue(this.usrService.loggedUsr.curp);
    this.usuarioForm.controls.email.setValue(this.usrService.loggedUsr.email);
    this.usuarioForm.controls.calle.setValue(this.usrService.loggedUsr.direccion.calle);
    this.usuarioForm.controls.numeroE.setValue(this.usrService.loggedUsr.direccion.numeroE);
    this.usuarioForm.controls.numeroI.setValue(this.usrService.loggedUsr.direccion.numeroI);
    this.usuarioForm.controls.colonia.setValue(this.usrService.loggedUsr.direccion.colonia);
    this.usuarioForm.controls.telefono.setValue(this.usrService.loggedUsr.telefono);
    this.usuarioForm.controls.estado.setValue(this.usrService.loggedUsr.direccion.estado);
    this.selectMunicipios();
    this.usuarioForm.controls.municipio.setValue(this.usrService.loggedUsr.direccion.municipio);
  }

  editarPass(){
    this.changePass = !this.changePass;
  }

  savePass(event: Event){
    event.preventDefault();
    this.changePassForm.markAllAsTouched();
    const passes = this.changePassForm.value;
    if (this.changePassForm.valid) {
      if(passes.pass != passes.pass2){
        return Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          showConfirmButton: true
      });
    }

      if(passes.pass === passes.pass2){
        this.usrService.updateUsuario(this.usrService.loggedUsr._id, passes)
        .subscribe((res: any)=>{
          return Swal.fire({
            icon: 'success',
            title: res.msg.toUpperCase(),
            showConfirmButton: true
        }); 
        },err => console.log(err)
        
        )
    }
    }
  }

}

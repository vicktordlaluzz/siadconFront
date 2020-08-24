import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  
  changePassForm: FormGroup;
  
  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public usrService: UsuariosService) { 
                this.buildForm();
              }

  ngOnInit(): void {
  }

  buildForm(){
    this.changePassForm = this.fb.group({
      pass: [``, Validators.required],
      newPass: [``, Validators.required],
      newPass2: [``, Validators.required]
    });
  }

  savePass(event: Event){

    event.preventDefault();

    this.changePassForm.markAllAsTouched();

    const passes = this.changePassForm.value;

    if (this.changePassForm.valid) {

      if(passes.newPass != passes.newPass2){

        return Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          showConfirmButton: true});
      }

      if(passes.newPass === passes.newPass2){

        this.authService.changePass(passes)
            .subscribe((res: any) => {
              this.changePassForm.reset();
              return Swal.fire({
                icon: 'success',
                title: res.msg.toUpperCase(),
                showConfirmButton: true
              });
            },
            (err: any) => {
              return Swal.fire({
              icon: 'error',
              title: err.error.msg.toUpperCase(),
              showConfirmButton: true});
            });
    }
    }
  }

  resetForm(){
    this.changePassForm.reset();
  }

}

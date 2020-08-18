import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
              public auth: AuthService,
              private router: Router) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.loginForm = this.fb.group({
      email: ['test2@mail.com', [Validators.required,Validators.email]],
      pass: ['123456', [Validators.required, Validators.email]],
    });
  }

  onLogin(event: Event){
    event.preventDefault();

    const credenciales = this.loginForm.value;

    this.auth.login(credenciales).subscribe(resp => {
      this.router.navigate(['/dashboard']);
    },(err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.msg
      });
    });
  }
}

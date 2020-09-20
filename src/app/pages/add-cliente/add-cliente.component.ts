import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DireccionesService } from '../../services/direcciones.service';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {

  nClienteForm: FormGroup;

  constructor(public direcService: DireccionesService,
              private fb: FormBuilder,
              private clienteServ: ClientesService,
              private router: Router) {
                this.buildForm();
                this.addTelefonosField();
               }

  ngOnInit(): void {
  }

  saveCliente(event: Event){
    event.preventDefault();
    const clienteData = this.nClienteForm.value;
    this.clienteServ.saveCliente(clienteData)
      .subscribe((res: any)=>{
        this.router.navigate(['dashboard/clientes/expedientes']);
        Swal.fire({
          icon: 'success',
          title: res.msg.toUpperCase(),
          showConfirmButton: true
        });
      }, error => console.log(error)
      )
  }


  selectMunicipios(){
    const municipio = this.nClienteForm.controls['estado'].value;
    this.direcService.getMunicipios(municipio);
  }

  // resetear formulario
  resetForm(){
    this.nClienteForm.reset();
    this.telefonos.controls.splice(1,this.telefonos.length);
  }

  // construccion del formulario
  buildForm(){
    this.nClienteForm = this.fb.group({
      nombre: ['test', Validators.required],
      apaterno: ['test', Validators.required],
      amaterno: ['test'],
      rfc: ['rolv920831r51', [Validators.required,Validators.minLength(12), Validators.maxLength(13)]],
      curp: ['rolv920831roioie98', [Validators.required,Validators.minLength(18), Validators.maxLength(18)]],
      nss: ['12345678912', [Validators.required,Validators.minLength(11), Validators.maxLength(11)]],
      email: ['vicktordlaluzz@gmail.com', [Validators.required,Validators.email]],
      puesto: ['contador', Validators.required],
      calle: ['', Validators.required],
      numeroE: [''],
      numeroI: [''],
      colonia: ['', Validators.required],
      estado: ['sin seleccion', Validators.required],
      municipio: ['', Validators.required],
      cp: ['', Validators.required],
      telefonos: this.fb.array([])
    })
  }

  // getter del arrayform de los telefonos
  get telefonos(){
    return this.nClienteForm.get('telefonos') as FormArray;
  }

  // agregar un formulario al array de los telefonos
  addTelefonosField(){
    const telefonosFormGroup = this.fb.group({
      telefono: ['', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      tipoTelefono: ['fijo'],
      comentarioTelefono: ['', Validators.required]
    });
    this.telefonos.push(telefonosFormGroup);
  }

  // remueve un grupo del formulario de los telefonos
  removeTelefono(){
    const indice = this.telefonos.length - 1;
    if(this.telefonos.length > 1){
      this.telefonos.removeAt(indice);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteI } from '../../models/cliente-i';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styles: [
  ]
})
export class DetalleClienteComponent implements OnInit {

  private clienteId: string;
  direcciones: string[];
  cliente: ClienteI;
  telefonos: string[];
  p=0;
  nDocumentoForm: FormGroup;
  chargeDocS = false;
  file: File;
  private documentos: any[];

  constructor(private actRoute: ActivatedRoute,
              private clientServ: ClientesService,
              private fb: FormBuilder,
              private docsServ: DocumentosService) { 
    this.clienteId = this.actRoute.snapshot.params.cliente;
    this.getClienteData();
    this.buildDocForm();
  }

  ngOnInit(): void {
  }

  getClienteData(){
    this.clientServ.getCliente(this.clienteId)
        .subscribe((res: any) => {
          this.cliente = res.cliente;
          this.direcciones = res.direcciones;
          this.telefonos = res.telefonos;
        }, err => console.log(err)
        );
  }

  buildDocForm(){
    this.nDocumentoForm = this.fb.group({
      file: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      comentarios: ['', Validators.required]
    });
  }

  chargeDoc(){
    this.chargeDocS = !this.chargeDocS;
  }

  guardarDocumento(){
    const data = this.nDocumentoForm.value;
    this.docsServ.chargeDoc(this.file, data, this.clienteId)
      .subscribe((res: any)=>{
        Swal.fire({
          icon: 'success',
          title: res.msg,
          showConfirmButton: false,
          timer: 1500
        });
        this.cancelarDoc();
      },(err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          showConfirmButton: true
        });
      }
      )
  }

  cancelarDoc(){
    this.nDocumentoForm.reset();
    this.chargeDocS = !this.chargeDocS;
  }
  
  prepareDoc(file: File){
    this.file = file;
  }
}

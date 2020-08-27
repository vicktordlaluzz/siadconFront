import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteI } from '../../models/cliente-i';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentosService } from '../../services/documentos.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs/operators';

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
  searchForm: FormGroup;
  chargeDocS = false;
  file: File;
  documentos: any;
  base_url = environment.base_url;
  filtrado = '';

  constructor(private actRoute: ActivatedRoute,
              private clientServ: ClientesService,
              private fb: FormBuilder,
              private docsServ: DocumentosService) { 
    this.clienteId = this.actRoute.snapshot.params.cliente;
    this.getClienteData();
    this.buildDocForm();
    this.buildSearchForm();
    this.getDocs();
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

  buildSearchForm(){
    this.searchForm = this.fb.group({
      termino: ['']
    });
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.filtrado = value.termino;
      });
  }
  chargeDoc(){
    this.chargeDocS = !this.chargeDocS;
  }

  descargarDoc(docId){

    this.docsServ.getDocumento(docId)
        .subscribe((res: any) =>{
          saveAs(res,docId);
        }, error => console.log(error)
        )
  }

  deleteDoc(docId){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminarlo?',
      text: "!No podras deshacer esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.docsServ.deleteDoc(docId)
            .subscribe((res: any) =>{
              Swal.fire(
                'Eliminado!',
                res.msg,
                'success'
              );
              this.getDocs();
              this.p =0;
            }, err => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.msg
              });
            });
      }
    })
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
        this.getDocs();
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

  getDocs(){
    this.docsServ.getDocumentos(this.clienteId)
        .subscribe((res: any) => {
          this.documentos = res.docs;
        }, error => {
          console.log(error);
        })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteI } from '../../models/cliente-i';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentosService } from '../../services/documentos.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { debounceTime } from 'rxjs/operators';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styles: [
  ]
})
export class DetalleClienteComponent implements OnInit {

  // Datos del cliente
  private clienteId: string;
  direcciones: string[];
  cliente: ClienteI;
  telefonos: string[];
  documentos: any;
  clienteForm: FormGroup;

  // tramites
  tramites: any;

  tiposDocumentos: any;
  p=0;
  nDocumentoForm: FormGroup;
  searchForm: FormGroup;
  chargeDocS = false;
  file: File;
  base_url = environment.base_url;
  filtrado = '';

  constructor(private router: Router,
              private actRoute: ActivatedRoute,
              private clientServ: ClientesService,
              private fb: FormBuilder,
              private docsServ: DocumentosService,
              private tramiteServ: TramitesService) { 
    this.clienteId = this.actRoute.snapshot.params.cliente;
    this.getClienteData();
    this.buildDocForm();
    this.buildSearchForm();
    this.getDocs();
    this.getTiposDoc();
    this.getTramites();
    this.buildClienteForm();
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

  // setear formulario para editar datos del cliente
  buildClienteForm(){
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      rfc: ['', [Validators.required,Validators.minLength(12), Validators.maxLength(13)]],
      curp: ['', [Validators.required,Validators.minLength(18), Validators.maxLength(18)]],
      nss: ['', [Validators.required,Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required,Validators.email]],
      puesto: ['', Validators.required],
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

  fillForm(){
    this.clienteForm.get('nombre').setValue(this.cliente.nombre);
    this.clienteForm.get('apaterno').setValue(this.cliente.apaterno);
    this.clienteForm.get('amaterno').setValue(this.cliente.amaterno);
    this.clienteForm.get('rfc').setValue(this.cliente.rfc);
    this.clienteForm.get('curp').setValue(this.cliente.curp);
    this.clienteForm.get('nss').setValue(this.cliente.nss);
    this.clienteForm.get('email').setValue(this.cliente.email);
  }

  chargeDoc(){
    this.chargeDocS = !this.chargeDocS;
  }

  descargarDoc(docId){

    this.docsServ.getDocumento(docId)
        .subscribe((res: any) =>{
          saveAs(res,docId);
        }, error => console.log(error)
        );
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
    console.log(data);
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
        console.log(err);
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
          console.log(res.docs);
          this.documentos = res.docs;
        }, error => {
          console.log(error);
        })
  }

  getTiposDoc(){
    this.docsServ.getTipos()
        .subscribe((res: any) => {
          this.tiposDocumentos = res.tipos;
        }, err => console.log(err)
        )
  }

  getTramites(){
    this.tramiteServ.getTramiesByCliente(this.clienteId)
      .subscribe((res: any) => {
        this.tramites = res.tramite;
        console.log(this.tramites);
        
      }, err => console.log(err)
      );
  }

  detalleTramite(tramite: string){
    this.router.navigateByUrl(`/dashboard/tramite/${tramite}`);
  }
}

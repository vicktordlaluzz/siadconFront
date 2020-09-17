import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TramitesService } from '../../services/tramites.service';
import { TramiteI } from '../../models/tramite-i';
import Swal from 'sweetalert2';
import { DocumentosService } from '../../services/documentos.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tramite-detail',
  templateUrl: './tramite-detail.component.html',
  styleUrls: ['./tramite-detail.component.css']
})
export class TramiteDetailComponent implements OnInit {

  tramiteId: string;
  tramite: TramiteI;

  file: File;
  tiposDocumentos: any;

  nDocumentoForm: FormGroup;

  // documentos
  documentos: any;

  constructor(private actRoute: ActivatedRoute,
              private tramiteService: TramitesService,
              private router: Router,
              private docsServ: DocumentosService,
              private fb: FormBuilder) {
    this.tramiteId = this.actRoute.snapshot.params.tramiteId;
    this.getTiposDoc();
    this.buildTramite();
    this.buildDocForm();
    this.getDocs();

   }

  ngOnInit(): void {
  }

  buildTramite(){
    this.tramiteService.getTramite(this.tramiteId)
        .subscribe((res: any) =>{
          this.tramite = res.tramite;
        }, err => {
          console.log(err);
        });
  }

  buildDocForm(){
    this.nDocumentoForm = this.fb.group({
      file: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      comentarios: ['', Validators.required]
    });
  }

  closeView(){
    this.router.navigateByUrl('dashboard/listaTramites');
  }


  selectDoc(){
    Swal.fire({
      title: 'Selecciona un documento',
      input: 'file',
      inputAttributes: {
        'accept': '.pdf',
        'aria-label': 'Sube un nuevo documento'
      }
    });
}

subirDocumento(event: Event){
  event.preventDefault();
  this.nDocumentoForm.markAllAsTouched();
  if(this.nDocumentoForm.valid){
    const data = this.nDocumentoForm.value;
    console.log(data);
    this.docsServ.chargeDoc(this.file, data, this.tramiteId)
      .subscribe((res: any)=>{
        Swal.fire({
          icon: 'success',
          title: res.msg,
          showConfirmButton: false,
          timer: 1500
        });
        this.cancelDoc();
    this.getDocs();
      },
      (err: any) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: err.error.msg,
          showConfirmButton: true
        });
      }
      )
  }
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

getTiposDoc(){
  this.docsServ.getTipos()
      .subscribe((res: any) => {
        this.tiposDocumentos = res.tipos;
      }, err => console.log(err)
      );
}

prepareDoc(file: File){
  this.file = file;
}

cancelDoc(){
  this.nDocumentoForm.reset();
  this.file = null;
}

getDocs(){
  this.docsServ.getDocumentos(this.tramiteId)
      .subscribe((res: any) => {
        this.documentos = res.docs;
      }, error => {
        console.log(error);
      })
}

}

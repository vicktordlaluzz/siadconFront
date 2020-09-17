import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TramitesService } from '../../services/tramites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-tramite',
  templateUrl: './new-tramite.component.html',
  styleUrls: ['./new-tramite.component.css']
})
export class NewTramiteComponent implements OnInit {

  // lista de clientes
  clientes: string[];
  p = 1;
  filtrado = '';
  searchForm: FormGroup;

  // cliente seleccionado
  selCliente: any;

  // formularios
  tramiteForm: FormGroup;
  step: number;
  showForm = false;
  tiposTramite: any;
  hipotecas: any;
  registros: any;
  gastos: any[];

  constructor(private tramitesService: TramitesService,
              private clientesServ: ClientesService,
              private fb: FormBuilder,
              private router: Router) {
                this.getClientes();
                this.getTiposTramite();
                this.getHipotecas();
                this.getRegistros();
                this.getTiposGasto();
                this.buildSearchForm();
                this.buildTramiteForm();
              }


  ngOnInit(): void {
    this.alert();
  }

  getTiposGasto(){
    this.tramitesService.getTiposGastos()
        .subscribe((res: any) => {
          this.gastos = res.gastos;
        }, err => console.log(err)
        );
  }

  getRegistros(){
    this.tramitesService.getRegistros()
        .subscribe((res: any) => {
          this.registros = res.registros;
        }, err => console.log(err)
        );
  }

  getHipotecas(){
    this.tramitesService.getHipotecas()
        .subscribe((res: any) => {
          this.hipotecas = res.hipotecas;
        }, err => console.log(err)
        );
  }

  getTiposTramite(){
    this.tramitesService.getTiposTramite()
        .subscribe((res: any) => {
          this.tiposTramite = res.tipoTramite;
        }, err => console.log(err)
        )
  }

  getClientes(){
    this.clientesServ.getClientes()
      .subscribe((res: any) => {
        this.clientes = res.clientes;
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

  seleccionarCliente(clienteID){
    this.clientesServ.getCliente(clienteID)
        .subscribe((res: any) => {
          this.selCliente = res;
        }, err => console.error(err)
        );
  }

  back(){
    this.selCliente = null;
    this.showForm = false;
    this.alert();
  }
  
  get deducibles(){
    return this.tramiteForm.get('deducibles') as FormArray;
  }

  saveTramite(event: Event){
    event.preventDefault();
    this.tramiteForm.markAllAsTouched();
    if (this.tramiteForm.valid){
      this.tramiteForm.controls.cliente.setValue(this.selCliente.cliente._id);
      const data = this.tramiteForm.value;
      this.tramitesService.saveTramite(data)
          .subscribe((res: any) =>{
            if(res.ok){
              Swal.fire({
                icon: 'success',
                title: res.msg,
                timer: 2000
              });
              this.router.navigateByUrl('/dashboard/listaTramites');
            }
          }, err => {
            console.log(err);
          });
    }
  }

  buildTramiteForm(){
    this.tramiteForm = this.fb.group({
      cliente: [],
      anio: ['2014', Validators.required],
      tipoTramite: [null, Validators.required],
      registro: [],
      registroM: [],
      hipoteca: [],
      hipotecaM: [],
      montoS: [0.00, [Validators.required, Validators.min(1)]],
      montoA: [0.00],
      honorario: [0.00],
      comentarios: ['',Validators.required]
    });
  }

  alert(){
    Swal.fire({
      icon: 'warning',
      title: 'Porfavor selecciona un cliente'
    });
  }

  mostrarForm(){
    this.showForm = true;
  }

}

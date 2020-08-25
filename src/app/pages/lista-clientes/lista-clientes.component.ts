import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: string[];
  p = 1;
  filtrado = '';
  searchForm:FormGroup;
  constructor(private clientesServ: ClientesService,
              private fb: FormBuilder) { 
    this.getClientes();
    this.buildForm();
  }

  ngOnInit(): void {
  }

  getClientes(){
    this.clientesServ.getClientes()
      .subscribe((res: any) => {
        this.clientes = res.clientes;
      });
  }

  buildForm(){
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


}

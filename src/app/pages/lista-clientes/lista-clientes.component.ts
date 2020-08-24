import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: string[];
  p: number = 1;
  constructor(private clientesServ: ClientesService) { 
    this.getClientes();
  }

  ngOnInit(): void {
  }

  getClientes(){
    this.clientesServ.getClientes()
      .subscribe((res: any) => {
        this.clientes = res.clientes;
      });
  }


}

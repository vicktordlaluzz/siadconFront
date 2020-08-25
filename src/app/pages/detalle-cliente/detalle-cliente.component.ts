import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { ClienteI } from '../../models/cliente-i';

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

  constructor(private actRoute: ActivatedRoute,
              private clientServ: ClientesService) { 
    this.clienteId = this.actRoute.snapshot.params.cliente;
    this.getClienteData();
    
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


}

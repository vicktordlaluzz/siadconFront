import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaCliente'
})
export class BusquedaClientePipe implements PipeTransform {

  
  transform(clientes: any[], termino: string): any[] {
    let result = [];
    if (termino.toString() === '') {
      result = clientes;
    }else {
      result = clientes
      .filter(function(cliente){
        const nombre = (cliente.nombre + ' ' + cliente.apaterno + ' ' + cliente.amaterno).toUpperCase();
        const rfc = (cliente.rfc).toUpperCase();
        const arg = termino.toUpperCase();
        if (nombre.includes(arg) || rfc.includes(arg)){
          return true;
        }else{
          return false;
        }
      });
    }
    return result;
  }

}

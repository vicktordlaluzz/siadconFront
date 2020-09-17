import { Pipe, PipeTransform } from '@angular/core';
import { TramiteI } from '../models/tramite-i';

@Pipe({
  name: 'searchTramites'
})
export class SearchTramitesPipe implements PipeTransform {

  transform(tramites: TramiteI[], termino: string): any[]{
    let result = [];
    if (termino.toString() === '') {
      result = tramites;
    }else {
      result = tramites
      .filter(function(tramite){
        const nombre = (tramite.cliente.nombre + ' ' + tramite.cliente.apaterno + ' ' + tramite.cliente.amaterno).toUpperCase();
        const rfc = (tramite.cliente.rfc).toUpperCase();
        const anio = (tramite.anio).toString();
        const devolucion = (tramite.tipo.nombre).toUpperCase();
        const estado = (tramite.estado.estado).toUpperCase();
        const arg = termino.toUpperCase();
        if (nombre.includes(arg) ||
            rfc.includes(arg) ||
            anio.includes(arg)||
            estado.includes(arg)||
            devolucion.includes(arg)){
          return true;
        }else{
          return false;
        }
      });
    }
    return result;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serachDoc'
})
export class SerachDocPipe implements PipeTransform {

  transform(documentos: any[], termino: string): any[] {
    let result = [];
    if (termino.toString() === '') {
      result = documentos;
    }else {
      result = documentos
      .filter(function(documento){
        const tipoDocumento = documento.tipoDocumento.toUpperCase();
        const comentarios = documento.comentarios.toUpperCase();
        const arg = termino.toUpperCase();
        if (tipoDocumento.includes(arg) || comentarios.includes(arg)){
          return true;
        }else{
          return false;
        }
      });
    }
    return result;
  }

}

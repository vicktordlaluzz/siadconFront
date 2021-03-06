import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('x-token');
   }

  chargeDoc(file: File, form, cliente){
    let fileF: File = file;
    let formData: FormData = new FormData();
    formData.append('documento', fileF, fileF.name);
    formData.append('tipoDocumento', form.tipoDocumento);
    formData.append('comentarios', form.comentarios);
    return this.http.post(`${environment.base_url}/documentos/${cliente}`, formData, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getDocumentos(cliente){
    return this.http.get(`${environment.base_url}/documentos/${cliente}`, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getDocumento(documento){
    return this.http.get(`${environment.base_url}/documentos/downloads/${documento}`, {
      headers: {
        'x-token': this.token,
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    });
  }

  deleteDoc(docId){
    return this.http.delete(`${environment.base_url}/documentos/${docId}`, {
      headers: {
        'x-token': this.token
      }}
    );
  }

  // tipos de documentos
  getTipos(){
    return this.http.get(`${environment.base_url}/documentos/tipos`, {
      headers: {
        'x-token': this.token
      }}
    );
  }
}

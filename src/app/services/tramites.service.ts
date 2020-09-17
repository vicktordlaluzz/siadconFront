import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  token: string;
  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('x-token');
  }
  
  getTiposTramite(){
    return this.http.get(`${environment.base_url}/tramites/tipos`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getTiposGastos(){
    return this.http.get(`${environment.base_url}/tramites/gastos`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getHipotecas(){
    return this.http.get(`${environment.base_url}/tramites/hipotecas`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getRegistros(){
    return this.http.get(`${environment.base_url}/tramites/registros`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  saveTramite(data){
    return this.http.post(`${environment.base_url}/tramites`,data,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getTramites(){
    return this.http.get(`${environment.base_url}/tramites`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getTramite(tramiteId: string){
    return this.http.get(`${environment.base_url}/tramites/${tramiteId}`, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getTramiesByCliente(clienteId: string){
    return this.http.get(`${environment.base_url}/tramites/cliente/${clienteId}`, {
      headers: {
        'x-token': this.token
      }
    });
  }


}

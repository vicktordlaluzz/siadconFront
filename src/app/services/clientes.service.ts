import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private token;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('x-token');
   }

  saveCliente(data){
    return this.http.post(`${environment.base_url}/clientes`,data,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getClientes(){
    return this.http.get(`${environment.base_url}/clientes`,{
      headers: {
        'x-token': this.token
      }
    });
  }
}

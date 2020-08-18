import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  createUsuario(usuario: any){
    return this.http.post(`${environment.base_url}/usuarios`,usuario);
  }

  getUsuarios(){
    return this.http.get(`${environment.base_url}/usuarios`);
  }

  deleteUsuario(usuario){
    return this.http.delete(`${environment.base_url}/usuarios/${usuario}`);
  }
}

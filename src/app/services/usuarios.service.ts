import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { UsuarioI } from '../models/usuario-i';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public loggedUsr: UsuarioI;
  
  constructor(private http: HttpClient,
              public authService: AuthService) {
                this.buildLogged();
  }

  createUsuario(usuario: any){
    return this.http.post(`${environment.base_url}/usuarios`,usuario);
  }

  getUsuarios(){
    return this.http.get(`${environment.base_url}/usuarios`);
  }

  deleteUsuario(usuario){
    return this.http.delete(`${environment.base_url}/usuarios/${usuario}`);
  }

  getUsuario(usuario){
    return this.http.get(`${environment.base_url}/usuarios/${usuario}`)
  }

  cargarImg(usuarioId, file){
    let fielF: File = file;

    let formData:FormData = new FormData();

    formData.append('img', fielF, fielF.name);
    return this.http.post(`${environment.base_url}/usuarios/img/${usuarioId}`,formData);
  }

  updateUsuario(usuario: String,data){
    return this.http.put(`${environment.base_url}/usuarios/${usuario}`,data)
  }

  buildLogged(){
    this.getUsuario(this.authService.logedUsrID)
        .subscribe((res: any)=>{
          this.loggedUsr = res.usuario;
        }, err => console.log(err)
        )
  }
}

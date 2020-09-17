import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { UsuarioI } from '../models/usuario-i';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public loggedUsr: UsuarioI;
  token: string;
  
  constructor(private http: HttpClient,
              public authService: AuthService) {
                this.buildLogged();
                this.token = localStorage.getItem('x-token');
  }

  createUsuario(usuario: any){
    return this.http.post(`${environment.base_url}/usuarios`,usuario,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getUsuarios(){
    return this.http.get(`${environment.base_url}/usuarios`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  deleteUsuario(usuario){
    return this.http.delete(`${environment.base_url}/usuarios/${usuario}`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  getUsuario(usuario){
    let headers = new HttpHeaders();
    headers.set('x-token', this.token); //o setItem()
    return this.http.get(`${environment.base_url}/usuarios/${usuario}`,{
      headers: {
        'x-token': this.token
      }
    });
  }

  cargarImg(usuarioId, file){
    let fielF: File = file;

    let formData:FormData = new FormData();

    formData.append('img', fielF, fielF.name);
    return this.http.post(`${environment.base_url}/usuarios/img/${usuarioId}`,formData,{
      headers: {
        'x-token': this.token
      }
    });
  }

  updateUsuario(usuario: String,data){
    return this.http.put(`${environment.base_url}/usuarios/${usuario}`,data,{
      headers: {
        'x-token': this.token
      }
    })
  }

  buildLogged(){
    if(this.authService.logedUsrID){
      this.getUsuario(this.authService.logedUsrID)
      .subscribe((res: any)=>{
        this.loggedUsr = res.usuario;
      }, err => console.log(err)
      )
    }
  }
}

import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logedUsr: any;
  role: any;


  constructor(private http: HttpClient) {
   }

  login(form){
    return this.http.post(`${environment.base_url}/auth`,form)
              .pipe(
                tap((resp: any) =>{
                  localStorage.setItem('x-token',resp.token);
                })
              );
  }

  logOut(){
    this.logedUsr = null;
    this.role = null;
    localStorage.removeItem('x-token');
  }

  decodeToken(){
    if(localStorage.getItem('x-token')){
      const decode = jwt_decode(localStorage.getItem('x-token'));
      this.logedUsr = decode.usuario;
      this.role = decode.role;
    }
  }
}

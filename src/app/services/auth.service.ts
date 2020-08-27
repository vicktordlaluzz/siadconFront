import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { async } from '@angular/core/testing';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logedUsrID = null;
  logedUsr= null;


  constructor(private http: HttpClient) {
              }

  login(form){
    return this.http.post(`${environment.base_url}/auth`,form)
              .pipe(
                tap((resp: any) =>{
                  localStorage.setItem('x-token',resp.token);
                  this.getUid();
                })
              );
  }

  logOut(){
    this.logedUsrID = null;
    localStorage.removeItem('x-token');
  }

  decodeToken(){
    if(localStorage.getItem('x-token')){
      const decode = jwt_decode(localStorage.getItem('x-token'));
      return decode;
    }
  }

  getUid(){
    this.logedUsrID = this.decodeToken().uid;
  }

  isLogged(){
    const token = localStorage.getItem('x-token') || '';
    return this.http.get(`${environment.base_url}/auth`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('x-token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false))
    );
  }
  
  changePass(form){
    return this.http.post(`${environment.base_url}/auth/changePass`,form,{
      headers:{
        'x-token': localStorage.getItem('x-token')
      }
    });
  }
}

import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

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
    console.log('getUid ' + this.logedUsrID);
    this.logedUsrID = this.decodeToken().uid;
  }
}

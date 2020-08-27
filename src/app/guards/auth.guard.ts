import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(){
    return this.authService.isLogged()
                .pipe(
                  tap( estaAutenticado => {
                        if(!estaAutenticado){
                          this.router.navigateByUrl('/login');
                        }
                  })
                  );
}
}

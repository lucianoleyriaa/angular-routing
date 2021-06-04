import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Injectable => permite poder injectar otro servicio dentro de este
@Injectable()
// CanActivate => es una interfaz que decide si una ruta puede ser accedida o no
export class Guard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  // Este metodo permite que se pueda o no acceder a una ruta
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // isAuthenticate => retorna una promesa
    return this.authService.isAuthenticate().then((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

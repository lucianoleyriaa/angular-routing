import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface ICanDeactivate {
  canDeactivate: () => Promise<boolean> | Observable<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<ICanDeactivate> {
  canDeactivate(
    component: ICanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    next: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | boolean {
    if (component.canDeactivate()) {
      return true;
    } else {
      return window.confirm(
        'Los cambios no se han guardado. ¿Esta seguro que desea abandonar esta pagina?'
      );
    }
  }
}

import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, catchError, of } from 'rxjs';
import { ApiService } from "../services/api.service";

export type TipoUsuario = 'admin' | 'host' | 'client';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(ApiService);
  const router = inject(Router);

  return auth.getMe().pipe(
    map((user: any) => {
      if (!user) {
        router.navigate(['admin/login']);
        return false;
      }

      const userTipo = user.tipo as TipoUsuario;

      if (userTipo === 'admin') {
        return true;
      }

      // Logueado pero no es anfitrión: no lo mandamos a /inicio genérico,
      // sino al login que le corresponde a su propio tipo
      if (userTipo === 'host') {
        router.navigate(['admin/login']);
      } else if (userTipo === 'client') {
        router.navigate(['pasajero/login']);
      } else {
        router.navigate(['admin/login']);
      }

      return false;
    }),

    catchError(() => {
      router.navigate(['admin/login']);
      return of(false);
    }),
  );
};
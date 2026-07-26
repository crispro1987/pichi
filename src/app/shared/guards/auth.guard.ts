import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, catchError, of } from 'rxjs';
import { ApiService } from "../services/api.service";

export type TipoUsuario = 'admin' | 'anfitrion' | 'cliente';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(ApiService);
  const router = inject(Router);

  return auth.getMe().pipe(
    map((user: any) => {
      if (!user) {
        router.navigate(['/ingresar']);
        return false;
      }

      const allowedRoles = route.data?.['roles'] as TipoUsuario[] | undefined;

      if (!allowedRoles || allowedRoles.length === 0) {
        return true;
      }

      const userTipo = user.tipo as TipoUsuario;

      if (allowedRoles.includes(userTipo)) {
        return true;
      }

      router.navigate(['/inicio']);
      return false;
    }),

    catchError(() => {
      router.navigate(['/ingresar']);
      return of(false);
    }),
  );
};
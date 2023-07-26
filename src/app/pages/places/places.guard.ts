import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

export const placesGuard: CanActivateFn = (
  route,
  state,
  authStore: AuthStore = inject(AuthStore),
  authService: AuthService = inject(AuthService),
  router: Router = inject(Router)
) => {
  return authStore.isUserLogged().pipe(
    switchMap((logged: boolean) => {

      console.log(logged)

      if (!logged) {
        authService.loginDialog()
        return of(true)
      }
      return authStore.loadUser(route.paramMap.get('userId') as string)
    })
  )
};

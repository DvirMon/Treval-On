import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { from, tap } from 'rxjs';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

export const placesGuard: CanActivateFn = (
  route,
  state,
  authStore: AuthStore = inject(AuthStore),
  router: Router = inject(Router)
) => {
  return authStore.isUserLogged().pipe(
    tap((loaded: boolean) => {

      if (!loaded) {
        return from(router.navigateByUrl('/'))
      }

      return loaded
    })
  )
};

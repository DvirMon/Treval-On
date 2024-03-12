import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Observable, from, iif, switchMap } from 'rxjs';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

export const placesGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state,
  authStore: AuthStore = inject(AuthStore),
  router: Router = inject(Router)
) => {


  const storageLogged$ = authStore.isStorageLogged()
  const true$ = storageLogged$.pipe(switchMap(() => onLoggedTrue(authStore, route)));
  const false$ = storageLogged$.pipe(switchMap(() => onLoggedFalse(router)));

  return storageLogged$.pipe(
    switchMap((logged: boolean) => iif(
      () => logged,
      true$,
      false$)
    ))
};

function onLoggedTrue(authStore: AuthStore, route: ActivatedRouteSnapshot) {
  const userId: string = route.paramMap.get('userId') as string
  return authStore.loadUser()
}

function onLoggedFalse(router: Router): Observable<boolean> {
  return from(router.navigateByUrl("/"))
}

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { switchMap, Observable, from, iif } from 'rxjs';

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
  return authStore.loadUser(userId)
}

function onLoggedFalse(router: Router): Observable<boolean> {
  return from(router.navigateByUrl("/"))
}

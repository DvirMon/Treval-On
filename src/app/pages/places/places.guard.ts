import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { switchMap, of, Observable, from, iif, filter } from 'rxjs';

export const placesGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state,
  authStore: AuthStore = inject(AuthStore),
  authService: AuthService = inject(AuthService),
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
  console.log("called true")
  const userId: string = route.paramMap.get('userId') as string
  return authStore.loadUser(userId)
}

function onLoggedFalse(router: Router): Observable<boolean> {
  console.log("called false")
  return from(router.navigateByUrl("/"))
}

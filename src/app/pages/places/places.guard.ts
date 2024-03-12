import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { Observable, from, of, switchMap } from "rxjs";
import { AuthStore } from "src/app/auth/store/auth.store.service";

export const placesGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state,
  authStore: AuthStore = inject(AuthStore),
  router: Router = inject(Router)
) => {
  return authStore
    .isStorageLogged()
    .pipe(
      switchMap((logged: boolean) =>
        logged ? onLoggedTrue() : onLoggedFalse(router)
      )
    );
};

function onLoggedTrue() {
  return of(true);
}

function onLoggedFalse(router: Router): Observable<boolean> {
  return from(router.navigateByUrl("/"));
}

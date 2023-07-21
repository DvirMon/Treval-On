import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { tap } from 'rxjs';

export const verifyGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, auth: AuthService = inject(AuthService)
) => {

  const emailLink: string = window.location.href
  return auth.isSignInWithEmailLink(emailLink).pipe(tap((value) => console.log(value)))
};

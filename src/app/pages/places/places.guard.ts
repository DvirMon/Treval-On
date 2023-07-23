import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

export const placesGuard: CanActivateFn = (route, state, authStore : AuthStore = inject(AuthStore)) => {
  return true;
};

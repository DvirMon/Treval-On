import { CanDeactivateFn } from '@angular/router';
import { AuthStore } from './store/auth.store.service';
import { inject } from '@angular/core';

export const cleanupGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  inject(AuthStore).cleanup();

  return true;
};

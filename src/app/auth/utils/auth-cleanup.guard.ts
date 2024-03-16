import { inject } from "@angular/core";
import { CanDeactivateFn } from "@angular/router";
import { AuthStore } from "../store/auth.store.service";

export const authCleanupGuard: CanDeactivateFn<unknown> = () => {
  inject(AuthStore).cleanup();

  return true;
};

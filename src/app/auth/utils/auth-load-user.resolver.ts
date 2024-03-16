import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { AuthStore } from "../store/auth.store.service";

export const authLoadUserResolver: ResolveFn<boolean> = (
  route,
  state,
  authStore: AuthStore = inject(AuthStore)
) => {
  const userId = route.paramMap.get("userId") as string;
  authStore.loadUserById(userId);
  return true;
};

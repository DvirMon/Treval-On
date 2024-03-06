import { isDevMode } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { AuthEffects } from "../../auth/store/auth.effects";
import { authReducer } from "../../auth/store/auth.reducer";
import { authFeatureKey } from "../../auth/store/auth.state";
import { FavoritesEffects } from "../../favorites/store/favorite.effects";
import { favoriteReducer } from "../../favorites/store/favorite.reducer";
import { favoritesFeatureKey } from "../../favorites/store/favorite.state";
import { PlacesEffects } from "../../vacations/store/vacation.effects";
import { vacationReducer } from "../../vacations/store/vacation.reducer";
import { vacationsFeatureKey } from "../../vacations/store/vacation.state";

export function provideNgRx() {
  return [
    provideStore({
      [authFeatureKey]: authReducer,
      [vacationsFeatureKey]: vacationReducer,
      [favoritesFeatureKey]: favoriteReducer,
    }),
    provideEffects(AuthEffects, PlacesEffects, FavoritesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ];
}

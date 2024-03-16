import { isDevMode } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";

import { AuthEffects } from "../../auth/store/auth.effects";
import { authReducer } from "../../auth/store/auth.reducer";
import { authFeatureKey } from "../../auth/store/auth.state";
import { FavoritesEffects } from "../../store/favorites/favorite.effects";
import { favoriteReducer } from "../../store/favorites/favorite.reducer";
import { favoritesFeatureKey } from "../../store/favorites/favorite.state";
import { PlacesEffects } from "../../store/places/places.effects";
import { placesFeatureKey } from "src/app/store/places/places.state";
import { placesReducer } from "src/app/store/places/places.reducer";

export function provideNgRx() {
  return [
    provideStore({
      [authFeatureKey]: authReducer,
      [placesFeatureKey]: placesReducer,
      [favoritesFeatureKey]: favoriteReducer,
    }),
    provideEffects(AuthEffects, PlacesEffects, FavoritesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ];
}

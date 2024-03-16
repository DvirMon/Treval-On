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
import { PlacesEffects } from "../../places/store/places.effects";
import { placesFeatureKey } from "src/app/places/store/places.state";
import { placesReducer } from "src/app/places/store/places.reducer";


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

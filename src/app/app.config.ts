import { DIALOG_DATA } from "@angular/cdk/dialog";
import { provideHttpClient } from "@angular/common/http";
import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
} from "@angular/core";
import {
    MAT_DIALOG_DATA,
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogConfig,
    MatDialogModule,
} from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { appRoutes } from "./app.routes";
import { AuthEffects } from "./auth/store/auth.effects";
import { authReducer } from "./auth/store/auth.reducer";
import { authFeatureKey } from "./auth/store/auth.state";
import { FavoritesEffects } from "./favorites/store/favorite.effects";
import { favoriteReducer } from "./favorites/store/favorite.reducer";
import { favoritesFeatureKey } from "./favorites/store/favorite.state";
import { provideFirebase } from "./utilities/firebase";
import { PlacesEffects } from "./vacations/store/vacation.effects";
import { vacationReducer } from "./vacations/store/vacation.reducer";
import { vacationsFeatureKey } from "./vacations/store/vacation.state";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      [authFeatureKey]: authReducer,
      [vacationsFeatureKey]: vacationReducer,
      [favoritesFeatureKey]: favoriteReducer,
    }),
    provideEffects(AuthEffects, PlacesEffects, FavoritesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideFirebase(),

    { provide: MAT_DIALOG_DATA, useValue: DIALOG_DATA },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MatDialogConfig },
  ],
};

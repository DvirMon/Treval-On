import { DIALOG_DATA } from "@angular/cdk/dialog";
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, isDevMode } from "@angular/core";
import { provideAnalytics, getAnalytics } from "@angular/fire/analytics";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideMessaging, getMessaging } from "@angular/fire/messaging";
import { MatDialogModule, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { appRoutes } from "./app.routes";
import { AuthEffects } from "./auth/store/auth.effects";
import { authReducer } from "./auth/store/auth.reducer";
import { authFeatureKey } from "./auth/store/auth.state";
import { FavoritesEffects } from "./favorites/store/favorite.effects";
import { favoriteReducer } from "./favorites/store/favorite.reducer";
import { favoritesFeatureKey } from "./favorites/store/favorite.state";
import { VacationEffects } from "./vacations/store/vacation.effects";
import { vacationReducer } from "./vacations/store/vacation.reducer";
import { vacationsFeatureKey } from "./vacations/store/vacation.state";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, MatDialogModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideMessaging(() => getMessaging()),
      provideAnalytics(() => getAnalytics()),
    ),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideStore({
      [authFeatureKey]: authReducer,
      [vacationsFeatureKey]: vacationReducer,
      [favoritesFeatureKey]: favoriteReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects, VacationEffects, FavoritesEffects),

    { provide: MAT_DIALOG_DATA, useValue: DIALOG_DATA },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: MatDialogConfig },
  ]
}

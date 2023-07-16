import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { appRoutes } from './app/app.routes';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { vacationReducer } from './app/store/vacations/vacation.reducer';
import { vacationsFeatureKey } from './app/store/vacations/vacation.state';
import { VacationEffects } from './app/store/vacations/vacation.effects';
import { favoriteReducer } from './app/favorites/store/favorite.reducer';
import { favoritesFeatureKey } from './app/favorites/store/favorite.state';

import { environment } from './environments/environment';
import { FavoritesEffects } from './app/favorites/store/favorites.effects';
import { authFeatureKey } from './app/auth/store/auth.state';
import { authReducer } from './app/auth/store/auth.reducer';
import { AuthEffects } from './app/auth/store/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom
      (
        BrowserModule,
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
      [authFeatureKey] : authReducer,
      [vacationsFeatureKey]: vacationReducer,
      [favoritesFeatureKey]: favoriteReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(AuthEffects, VacationEffects, FavoritesEffects),
    {
      provide: ScreenTrackingService, useClass: ScreenTrackingService
    },
    {
      provide: UserTrackingService, useClass: UserTrackingService
    }
  ]
})
  .catch(err => console.error(err));

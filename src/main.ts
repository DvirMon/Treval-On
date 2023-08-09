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

import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { favoriteReducer } from './app/favorites/store/favorite.reducer';
import { favoritesFeatureKey } from './app/favorites/store/favorite.state';
import { VacationEffects } from './app/vacations/store/vacation.effects';
import { vacationReducer } from './app/vacations/store/vacation.reducer';
import { vacationsFeatureKey } from './app/vacations/store/vacation.state';

import { environment } from './environments/environment';
import { FavoritesEffects } from './app/favorites/store/favorite.effects';
import { authFeatureKey } from './app/auth/store/auth.state';
import { authReducer } from './app/auth/store/auth.reducer';
import { AuthEffects } from './app/auth/store/auth.effects';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule,MatDialogModule,
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
})
  .catch(err => console.error(err));

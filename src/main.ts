import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { vacationReducer } from './app/store/vacations/vacation.reducer';
import { vacationsFeatureKey } from './app/store/vacations/vacation.state';
import { VacationEffects } from './app/store/vacations/vacation.effects';

import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';

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
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ [vacationsFeatureKey]: vacationReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(VacationEffects),
    {
      provide: ScreenTrackingService, useClass: ScreenTrackingService
    },
    {
      provide: UserTrackingService, useClass: UserTrackingService
    }
  ]
})
  .catch(err => console.error(err));

import { importProvidersFrom } from "@angular/core";
import { getAnalytics, provideAnalytics } from "@angular/fire/analytics";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getMessaging, provideMessaging } from "@angular/fire/messaging";
import { environment } from "src/environments/environment";

export function provideFirebase() {
  return [
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideMessaging(() => getMessaging()),
      provideAnalytics(() => getAnalytics())
    ),
  ];
}

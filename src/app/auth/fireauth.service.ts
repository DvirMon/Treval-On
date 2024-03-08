import { Injectable, Injector, inject } from "@angular/core";
import {
  ActionCodeSettings,
  Auth,
  ConfirmationResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  UserCredential,
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
  confirmPasswordReset,
} from "@angular/fire/auth";
import { Observable, from, map, of } from "rxjs";
import { generateVerificationLink } from "./auth.helpers";

export interface FirebaseError {
  code: string;
  customData: Record<string, unknown>;
  name: string;
  message: string;
}

@Injectable({ providedIn: "root" })
export class FireAuthService {
  private readonly injector = inject(Injector);
  private readonly auth = inject(Auth);

  private authErrorMessages: { [errorCode: string]: string } = {
    "auth/invalid-email": "The email address is not valid.",
    "auth/invalid-password": "The password is not valid.",
  };

  // Create a new user account with the provided email and password.
  public createInWithEmailAndPassword$(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // Sign in with phone number and recaptcha verification.
  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return from(
      signInWithPhoneNumber(
        this.auth,
        phone,
        new RecaptchaVerifier(this.auth, "recaptcha", { size: "invisible" })
      )
    );
  }

  // Send a sign-in link (magic link) to the provided email.
  public sendSignInLinkToEmail$(email: string): Observable<string> {
    const actionCodeSettings: ActionCodeSettings = {
      url: generateVerificationLink(this.injector),
      handleCodeInApp: true,
    };

    return from(
      sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
    ).pipe(map(() => email));
  }

  // Check if the provided email link is a valid sign-in link.
  public isSignInWithEmailLink$(emailLink: string): Observable<boolean> {
    return of(isSignInWithEmailLink(this.auth, emailLink));
  }

  // Private method: Sign in with Google OAuth provider.
  public signInWithGoogle$(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  // Private method: Sign in with email link (magic link).
  public signInWithEmailLink$(
    email: string,
    emailLink: string
  ): Observable<UserCredential> {
    return from(signInWithEmailLink(this.auth, email, emailLink));
  }

  // Private method: Sign in with email and password.
  public signInWithEmailAndPassword$(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  public sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  public confirmPasswordReset(
    oobCode: string,
    newPassword: string
  ): Observable<void> {
    return from(confirmPasswordReset(this.auth, oobCode, newPassword));
  }
}

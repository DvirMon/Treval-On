import { Injectable, Injector, inject } from "@angular/core";
import {
  Auth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  RecaptchaVerifier,
  ConfirmationResult,
  UserCredential,
  ActionCodeSettings,
  isSignInWithEmailLink,
} from "@angular/fire/auth";
import { generateVerificationLink } from "./auth.helpers";
import { Observable, from, map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class FireAuthService {
  private readonly injector = inject(Injector);
  private readonly auth = inject(Auth);

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
}

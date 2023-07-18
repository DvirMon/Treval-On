import { Injectable, Injector, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
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
} from '@angular/fire/auth';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { SignInEvent, SignInMethod } from './store/auth.model';
import { generateVerificationLink } from './auth.helpers';

@Injectable({ providedIn: "root" })

export class AuthService {

  private readonly injector = inject(Injector);
  private readonly auth = inject(Auth);

  constructor() { }

  public signIn$(event: SignInEvent): Observable<UserCredential> {
    const { method, data } = event

    return of(method).pipe(
      switchMap((method: SignInMethod) => {

        switch (method) {

          case SignInMethod.GOOGLE:
            return this._signInWithGoogle$()
          case SignInMethod.EMAIL_LINK:
            return this._signInWithEmailLink$(data.email, data.emailLink)
          case SignInMethod.EMAIL_PASSWORD:
            return this._signInWithEmailAndPassword$(data.email, data.password)
          default: return of({} as UserCredential)
        }
      })
    )
  }

  private _signInWithGoogle$(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
  }

  private _signInWithEmailLink$(email: string, emailLink: string): Observable<UserCredential> {
    // const emailLink = 'http://localhost:4200/verify-email?token=verification_token&apiKey=AIzaSyAWE61Vm0CpfUtHq4G48aJVMbdY6REEtrA&oobCode=L-1Zf_E2LN8r0tqdNKmw6lYLuyiGRx62K2_ZLve9KAMAAAGJXqlMnw&mode=signIn&lang=en'
    return from(signInWithEmailLink(this.auth, email, emailLink))
  }

  private _signInWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  public createInWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }

  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return from(signInWithPhoneNumber(this.auth, phone, new RecaptchaVerifier('recaptcha', { size: 'invisible' }, this.auth)))
  }

  public sendSignInLinkToEmail$(email: string): Observable<void> {
    const actionCodeSettings: ActionCodeSettings = {
      url: generateVerificationLink(this.injector), handleCodeInApp: true,
    }
    return from(sendSignInLinkToEmail(this.auth, email, actionCodeSettings))
  }

}

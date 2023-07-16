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
import { SignInEvent, User, SignInMethod } from './store/auth.model';
import { generateVerificationLink, mapUserCredentials } from './auth.helpers';

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
            return this._signInWithEmailLink$(data)
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

  private _signInWithEmailLink$(email: string): Observable<UserCredential> {
    return from(signInWithEmailLink(this.auth, email))
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
    console.log('sendSignInLinkToEmail', email)
    const actionCodeSettings: ActionCodeSettings = {
      url: generateVerificationLink(this.injector), handleCodeInApp: true,
    }
    return from(sendSignInLinkToEmail(this.auth, email, actionCodeSettings))
  }

}

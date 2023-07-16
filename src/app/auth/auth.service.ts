import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  RecaptchaVerifier,
  ConfirmationResult,
  UserCredential
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { User } from './store/auth.model';
import { mapUserCredentials } from './auth.helpers';

@Injectable({ providedIn: "root" })

export class AuthService {

  constructor(
    private auth: Auth
  ) { }

  public signInWithGoogle$(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(mapUserCredentials())
  }

  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return from(signInWithPhoneNumber(this.auth, phone, new RecaptchaVerifier('recaptcha', { size: 'invisible' }, this.auth)))
  }

  public signInWithEmail$(email : string) : Observable<UserCredential>{
    return from(signInWithEmailLink(this.auth, email))
  }

  public signInWithEmailAndPassword$(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe((mapUserCredentials())
      )
  }
  public createInWithEmailAndPassword$(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe((mapUserCredentials())
      )
  }


}

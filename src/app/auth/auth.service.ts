import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  RecaptchaVerifier,
  UserCredential,
  User as UserFirebase,
  ConfirmationResult
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { User } from './store/auth.model';
import { mapUserCredentials } from './auth.helpers';

@Injectable({ providedIn: "root" })

export class AuthService {

  // private readonly _user: WritableSignal<User> = signal({} as User);
  // private readonly _logged: Signal<boolean> = computed(() => !!this._user());


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

  // public signInWithEmailAndPassword(email: string, password: string): Observable<User> {
  //   return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
  //     map((credential: UserCredential) => credential.user),
  //     map((userFirebase: UserFirebase) => {
  //       const user = this._mapUser(userFirebase)
  //       return user
  //     }))

  // }


}

import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Auth, signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider, ApplicationVerifier, UserCredential, User as UserFirebase, ConfirmationResult } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { User } from '../store/user/user.model';


class PhoneVerifier implements ApplicationVerifier {
  public type: string;

  constructor() {
    this.type = 'phone'; // Assign a default value or initialize it in the constructor
  }

  verify(): Promise<string> {
    // Implement your custom verification logic here
    // This method should return a Promise that resolves with a verification ID

    return Promise.resolve('verificationId');
  }
}


export class AuthService {

  private readonly _user: WritableSignal<User> = signal({} as User)
  private readonly _logged: Signal<boolean> = computed(() => !!this._user())


  constructor(
    private auth: Auth
  ) { }

  public setUser(user: User): void {
    this._user.set(user)
  }

  public getUser(): WritableSignal<User> {
    return this._user
  }

  public isLogged(): Signal<boolean> {
    return this._logged
  }

  public signInWithGoogle$(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()))
      .pipe(
        map((credential: UserCredential) => credential.user),
        map((userFirebase: UserFirebase) => {
          const user = this.mapUser(userFirebase)
          return user
        }))
  }

  public signInWithPhone(phone: string, verify: ApplicationVerifier): Observable<ConfirmationResult> {
    return from(signInWithPhoneNumber(this.auth, phone, new PhoneVerifier()))
  }

  private mapUser(user: UserFirebase): User {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    } as User
  }


}

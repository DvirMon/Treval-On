import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential, User as UserFirebase } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { User } from '../store/user/user.model';

@Injectable({
  providedIn: 'root'
})
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

  public googleAuth$(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
      .pipe(
        map((credential: UserCredential) => credential.user),
        map((userFirebase: UserFirebase) => {
          const user = this.mapUser(userFirebase)
          return user
        }))
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

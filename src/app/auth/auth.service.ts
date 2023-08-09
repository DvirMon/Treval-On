import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import { CollectionReference, Firestore, collection, getDocs, where, query, addDoc } from '@angular/fire/firestore';
import { SignInEvent, SignInMethod, User } from './store/auth.model';
import { mapQuerySnapshotDoc } from '../utilities/helpers';
import { DialogService } from '../components/dialog/dialog.service';
import { openLoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, from, of, switchMap, tap } from 'rxjs';
import { FireAuthService } from './fireauth.service';
import { ConfirmationResult, UserCredential } from '@angular/fire/auth';

@Injectable({ providedIn: "root" })
export class AuthService {

  private readonly injector = inject(Injector);

  private readonly USERS_COLLECTION = 'users';
  private readonly usersRef: CollectionReference<User>

  constructor(
    private readonly firestore: Firestore,
    private fireAuth: FireAuthService


  ) {
    this.usersRef = collection(this.firestore, this.USERS_COLLECTION) as CollectionReference<User>
  }

  public getUserById(userId: string): Observable<User> {
    return from(getDocs(query(this.usersRef, where('userId', '==', userId))))
      .pipe(mapQuerySnapshotDoc<User>(), tap((value) => console.log('user', value)))
  }

  public saveUser(user: User): void { from(addDoc(this.usersRef, user)) }

  public openLoginDialog(): MatDialogRef<openLoginDialogComponent, any> {
    return runInInjectionContext(this.injector, () =>
      inject(DialogService).openDialog(openLoginDialogComponent, {})
    )
  }

  // Sign in with different authentication methods based on the provided event.
  public signIn$(event: SignInEvent): Observable<UserCredential> {
    const { method, data } = event;

    return of(method).pipe(
      switchMap((method: SignInMethod) => {

        switch (method) {

          case SignInMethod.GOOGLE:
            return this.fireAuth.signInWithGoogle$();

          case SignInMethod.EMAIL_LINK:
            return this.fireAuth.signInWithEmailLink$(data.email, data.emailLink);

          case SignInMethod.EMAIL_PASSWORD:
            return this.fireAuth.signInWithEmailAndPassword$(data.email, data.password);

          default: return of({} as UserCredential);
        }
      })
    );
  }

  // Create a new user account with the provided email and password.
  public createInWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword$(email, password);
  }

  // Sign in with phone number and recaptcha verification.
  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return this.fireAuth.signInWithPhone$(phone);
  }

  // Send a sign-in link (magic link) to the provided email.
  public sendSignInLinkToEmail$(email: string): Observable<string> {
    return this.fireAuth.sendSignInLinkToEmail$(email)
  }

  // Check if the provided email link is a valid sign-in link.
  public isSignInWithEmailLink(emailLink: string): Observable<boolean> {
    return this.fireAuth.isSignInWithEmailLink$(emailLink)
  }

}


import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
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
} from '@angular/fire/auth';
import { CollectionReference, Firestore, collection, getDocs, where, query, QuerySnapshot, getDoc, addDoc } from '@angular/fire/firestore';
import { SignInEvent, SignInMethod, User } from './store/auth.model';
import { generateVerificationLink } from './auth.helpers';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { mapQuerySnapshotDoc } from '../utilities/helpers';
import { DialogService } from '../components/dialog/dialog.service';
import { openLoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({ providedIn: "root" })
export class AuthService {

  private readonly injector = inject(Injector);
  private readonly auth = inject(Auth);

  private readonly USERS_COLLECTION = 'users';
  private readonly usersRef: CollectionReference<User>

  constructor(
    private readonly firestore: Firestore,


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
            return this._signInWithGoogle$();

          case SignInMethod.EMAIL_LINK:
            console.log('works');
            return this._signInWithEmailLink$(data.email, data.emailLink);

          case SignInMethod.EMAIL_PASSWORD:
            return this._signInWithEmailAndPassword$(data.email, data.password);

          default: return of({} as UserCredential);
        }
      })
    );
  }

  // Create a new user account with the provided email and password.
  public createInWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // Sign in with phone number and recaptcha verification.
  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return from(signInWithPhoneNumber(this.auth, phone, new RecaptchaVerifier('recaptcha', { size: 'invisible' }, this.auth)));
  }

  // Send a sign-in link (magic link) to the provided email.
  public sendSignInLinkToEmail$(email: string): Observable<string> {

    const actionCodeSettings: ActionCodeSettings = {
      url: generateVerificationLink(this.injector), handleCodeInApp: true,
    };

    return from(sendSignInLinkToEmail(this.auth, email, actionCodeSettings)).pipe(map(() => email));
  }

  // Check if the provided email link is a valid sign-in link.
  public isSignInWithEmailLink(emailLink: string): Observable<boolean> {
    return of(isSignInWithEmailLink(this.auth, emailLink));
  }

  // Private method: Sign in with Google OAuth provider.
  private _signInWithGoogle$(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  // Private method: Sign in with email link (magic link).
  private _signInWithEmailLink$(email: string, emailLink: string): Observable<UserCredential> {
    return from(signInWithEmailLink(this.auth, email, emailLink));
  }

  // Private method: Sign in with email and password.
  private _signInWithEmailAndPassword$(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
}


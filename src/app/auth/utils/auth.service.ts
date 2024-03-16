import { Injectable } from "@angular/core";
import { ConfirmationResult, UserCredential } from "@angular/fire/auth";
import {
  CollectionReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { Observable, from, map, of, switchMap } from "rxjs";
import { mapQuerySnapshotDoc } from "../../shared/helpers";
import { FireAuthService } from "./fireauth.service";
import { SignInEvent, SignInMethod, User } from "./auth.model";

interface EmailLinkData {
  email: string;
  emailLink: string;
}
interface EmailPasswordData {
  email: string;
  password: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly USERS_COLLECTION = "users";
  private readonly usersRef: CollectionReference<User>;

  constructor(
    private readonly firestore: Firestore,
    private readonly fireAuthService: FireAuthService
  ) {
    this.usersRef = collection(
      this.firestore,
      this.USERS_COLLECTION
    ) as CollectionReference<User>;
  }

  public register$(email: string, password: string) {
    return this.fireAuthService.createInWithEmailAndPassword$(email, password);
  }

  public getUserById(userId: string): Observable<User> {
    const querySnapshot$ = this.getUserQuerySnapshot$("userId", userId);
    return querySnapshot$.pipe(mapQuerySnapshotDoc<User>());
  }

  public saveUser(user: User): void {
    from(addDoc(this.usersRef, user));
  }

  public addDocument(user: User): Observable<User> {
    return this._checkDocumentExists(user.userId).pipe(
      switchMap((empty: boolean) => {
        if (empty) {
          return from(addDoc(this.usersRef, user)).pipe(
            map(() => user) // Return the user after successful addition
          );
        } else {
          return of(user);
        }
      })
    );
  }

  private _checkDocumentExists(userId: string): Observable<boolean> {
    const querySnapshot$ = this.getUserQuerySnapshot$("userId", userId);
    return querySnapshot$.pipe(map((querySnapshot) => querySnapshot.empty));
  }

  private getUserQuerySnapshot$(
    getBy: keyof User,
    value: string
  ): Observable<QuerySnapshot<User>> {
    return from(getDocs(query(this.usersRef, where(getBy, "==", value))));
  }

  // Sign in with different authentication methods based on the provided event.
  public signIn$(event: SignInEvent): Observable<UserCredential> {
    const { method, data } = event;

    return of(method).pipe(
      switchMap((method: SignInMethod) => {
        switch (method) {
          case SignInMethod.GOOGLE:
            return this.fireAuthService.signInWithGoogle$();

          case SignInMethod.EMAIL_LINK: {
            const emailLinkData = data as EmailLinkData;
            return this.fireAuthService.signInWithEmailLink$(
              emailLinkData.email,
              emailLinkData.emailLink
            );
          }

          case SignInMethod.EMAIL_PASSWORD: {
            const emailPasswordData = data as EmailPasswordData;
            return this.fireAuthService.signInWithEmailAndPassword$(
              emailPasswordData.email,
              emailPasswordData.password
            );
          }

          default:
            return of({} as UserCredential);
        }
      })
    );
  }

  // Create a new user account with the provided email and password.
  public createInWithEmailAndPassword$(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return this.fireAuthService.signInWithEmailAndPassword$(email, password);
  }

  // Sign in with phone number and recaptcha verification.
  public signInWithPhone$(phone: string): Observable<ConfirmationResult> {
    return this.fireAuthService.signInWithPhone$(phone);
  }

  // Send a sign-in link (magic link) to the provided email.
  public sendSignInLinkToEmail$(email: string): Observable<string> {
    return this.fireAuthService.sendSignInLinkToEmail$(email);
  }

  // Check if the provided email link is a valid sign-in link.
  public isSignInWithEmailLink(emailLink: string): Observable<boolean> {
    return this.fireAuthService.isSignInWithEmailLink$(emailLink);
  }
}

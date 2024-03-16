import { Injectable, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  filter,
  map,
  of,
  switchMap,
} from "rxjs";
import { getFromStorage } from "src/app/shared/helpers";
import { AuthServerError, SignInEvent, User } from "../utils/auth.model";
import { AuthActions } from "./auth.actions";
import { AuthSelectors } from "./auth.selectors";
import { StorageKey } from "src/app/shared/constants";

@Injectable({
  providedIn: "root",
})
export class AuthStore {
  private readonly loginSource: Subject<SignInEvent> =
    new Subject<SignInEvent>();

  constructor(private store: Store) {}

  public register(email: string, password: string) {
    const action = AuthActions.createUser({ email, password });
    this.store.dispatch(action);
  }

  public signIn(signInEvent: SignInEvent): void {
    this.loginSource.next(signInEvent);
  }

  public loadUser(): Signal<User> {
    return toSignal(this._login$(), { initialValue: {} as User });
  }

  private _login$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      switchMap((event: SignInEvent) => this._getUser$(event)),
      catchError(() => {
        return EMPTY;
      })
    );
  }

  private _getUser$(signInEvent: SignInEvent): Observable<User> {
    const loaded$ = this.store.select(AuthSelectors.selectLoaded);

    const user$: Observable<User> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(AuthActions.signIn({ signInEvent }));
        }
        return this.store.select(AuthSelectors.selectUser);
      })
    );

    return user$;
  }

  public loadUserById(userId: string): void {
    const action = AuthActions.loadUser({ userId });
    this.store.dispatch(action);
  }

  public sendEmailLink(email: string): void {
    const action = AuthActions.sendEmailLink({ email });
    this.store.dispatch(action);
  }

  public sendResetEmail(email: string) {
    const action = AuthActions.sendResetEmail({ email });
    this.store.dispatch(action);
  }

  public confirmResetPassword(newPassword: string, oobCode: string) {
    const action = AuthActions.confirmResetPassword({ newPassword, oobCode });
    this.store.dispatch(action);
  }

  public isStorageLogged(): Observable<boolean> {
    return of(getFromStorage<boolean>(StorageKey.LOGGED) || false);
  }

  public listenToSendEmailSuccess(): Observable<string> {
    return this.store
      .select(AuthSelectors.selectEmailLink)
      .pipe(filter((email) => !!email));
  }

  public listenTLoadUserSuccess(): Observable<string> {
    return this.store.select(AuthSelectors.selectLoaded).pipe(
      filter((loaded) => loaded),
      switchMap(() =>
        this.store
          .select(AuthSelectors.selectUser)
          .pipe(map((user: User) => user.userId))
      )
    );
  }

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  public loginServerError(): Signal<AuthServerError | null> {
    return this.store.selectSignal(AuthSelectors.selectServerError);
  }

  public cleanup(): void {
    this.store.dispatch(AuthActions.cleanup());
  }
}

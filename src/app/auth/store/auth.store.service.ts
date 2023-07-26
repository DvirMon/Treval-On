import { Injectable, Signal, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EMPTY, Observable, Subject, catchError, exhaustMap, filter, iif, map, of, skip, switchMap, tap } from 'rxjs';
import { SignInEvent, User } from './auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthActions } from './auth.actions';
import { AuthSelectors } from './auth.selectors';
import { getFromStorage } from 'src/app/utilities/helpers';
import { StorageKey } from 'src/app/utilities/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {


  private readonly user: Signal<User>
  private readonly loginSource: Subject<SignInEvent> = new Subject<SignInEvent>;

  constructor(
    private store: Store
  ) {

    this.user = this._setUser()
  }

  public loadUser(userId: string): Observable<boolean> {

    const loaded$ = this.store.select(AuthSelectors.selectLoaded);

    const trueResult$ = loaded$;

    const falseResult$ = loaded$.pipe(
      tap(() => this.store.dispatch(AuthActions.loadUser({ userId }))),
      map(() => true)
    );

    return loaded$.pipe(
      switchMap((loaded: boolean) => iif(
        () => loaded,
        trueResult$,
        falseResult$
      ))
    )

  }

  public getUser(): Signal<User> {
    return this.user
  }

  private _setUser(): Signal<User> {
    return toSignal(this._login$(), { initialValue: {} as User });
  }

  private _login$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap((event: SignInEvent) => this._handleSignInEvent$(event)),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  private _handleSignInEvent$(signInEvent: SignInEvent): Observable<User> {
    const loaded$ = this.store.select(AuthSelectors.selectLoaded)

    const user$: Observable<User> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(AuthActions.signIn({ signInEvent }))
        }
        return this.store.select(AuthSelectors.selectUser);
      })
    );
    return user$;
  }

  public signIn(signIn: SignInEvent): void {
    this.loginSource.next(signIn);
  }

  public sendEmailLink(email: string) {
    const action = AuthActions.sendEmailLink({ email })
    this.store.dispatch(action)
  }

  public isUserLogged(): Observable<boolean> {
    return of(!!getFromStorage(StorageKey.LOGGED, { useSessionStorage: true }))
  }

  public listenToSendEmailSuccess(): Observable<string> {
    return this.store.select(AuthSelectors.selectEmailLink).pipe(filter((email) => !!email))
  }

  public listenTLoadUserSuccess(): Observable<string> {
    return this.store.select(AuthSelectors.selectLoaded)
      .pipe(
        filter((loaded) => loaded),
        switchMap(() => this.store.select(AuthSelectors.selectUser)
          .pipe(
            map((user: User) => user.userId))
        )
      )
  }



}

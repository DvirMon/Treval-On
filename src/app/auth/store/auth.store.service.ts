import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignInEvent, User } from './auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthActions } from './auth.actions';
import { AuthSelectors } from './auth.selectors';
import { getFromStorage } from 'src/app/utilities/helpers';
import { StorageKey } from 'src/app/utilities/constants';
import { Subject, Observable, exhaustMap, catchError, EMPTY, switchMap, of, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {


  // private readonly user: Signal<User>
  private readonly loginSource: Subject<SignInEvent> = new Subject<SignInEvent>;

  constructor(
    private store: Store
  ) {

  }

  public register(email: string, password: string) {
    const action = AuthActions.createUser({ email, password })
    this.store.dispatch(action)
  }

  public signIn(signInEvent: SignInEvent): void {
    this.loginSource.next(signInEvent);
  }

  public loadUser(): Signal<User> {
    return toSignal(this._login$(), { initialValue: {} as User });
  }

  private _login$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap((event: SignInEvent) => this._getUser$(event)),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  private _getUser$(signInEvent: SignInEvent): Observable<User> {
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

  public sendEmailLink(email: string) {
    const action = AuthActions.sendEmailLink({ email })
    this.store.dispatch(action)
  }

  public isStorageLogged(): Observable<boolean> {
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

  public logout(): void {
    this.store.dispatch(AuthActions.logout())

  }



}

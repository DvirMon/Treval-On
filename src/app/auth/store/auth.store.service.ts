import { Injectable, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, Subject, catchError, exhaustMap, of, switchMap } from 'rxjs';
import { SignInEvent, SignInMethod, User } from './auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthActions } from './auth.actions';
import { AuthSelectors } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  private readonly user: Signal<User>
  private readonly loginSource: Subject<SignInEvent> = new Subject<SignInEvent>;

  constructor(
    private store: Store
  ) {

    this.user = this._setUser()
  }

  public getUser(): Signal<User> {
    return this.user
  }

  private _setUser(): Signal<User> {
    return toSignal(this._login$(), { initialValue: {} as User });
  }

  private _login$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap((event: SignInEvent) => this._handleSignIn$(event)),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  private _handleSignIn$(event: SignInEvent): Observable<User> {

    const { method, data } = event

    switch (method) {

      case SignInMethod.Google:
        return this._signInWithGmail$()
      default:
        return of({} as User)
    }

  }

  private _signInWithGmail$(): Observable<User> {
    const loaded$ = this.store.select(AuthSelectors.selectLoaded)

    const user$: Observable<User> = loaded$.pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(AuthActions.signInWithGmail());
        }
        return this.store.select(AuthSelectors.selectUser);
      })
    );
    return user$;
  }


  public signIn(signIn: SignInEvent): void {
    this.loginSource.next(signIn);
  }



}

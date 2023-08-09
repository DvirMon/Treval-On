import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { mapUserCredentials } from '../auth.helpers';
import { saveToStorage } from 'src/app/utilities/helpers';
import { StorageKey } from 'src/app/utilities/constants';
import { concatMap, tap, map, catchError, EMPTY, switchMap } from 'rxjs';



@Injectable()
export class AuthEffects {


  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }



  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signIn),
    concatMap(({ signInEvent }) => this.authService.signIn$(signInEvent)
      .pipe(
        mapUserCredentials(),
        tap(() => saveToStorage(StorageKey.LOGGED, true, { useSessionStorage: true })),
        tap((user) => this.authService.saveUser(user)),
        map((user) => AuthActions.loadUserSuccess({ user })),
        catchError((() => {
          return EMPTY
        })
        ))
    )
  ))

  emailLink$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.sendEmailLink),
    switchMap(({ email }) => this.authService.sendSignInLinkToEmail$(email)
      .pipe(
        map((email) => AuthActions.sendEmailLinkSuccess({ email })),
        catchError(() => {
          return EMPTY
        })
      )
    )
  ))

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadUser),
    switchMap(({ userId }) => this.authService.getUserById(userId)
      .pipe(
        tap((value) => console.log(value)),
        map((user) => AuthActions.loadUserSuccess({ user })),
        catchError(() => {
          return EMPTY
        })
      )
    )
  ))

}

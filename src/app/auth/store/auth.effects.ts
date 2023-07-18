import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { EMPTY, catchError, concatMap, map, switchMap } from 'rxjs';
import { mapUserCredentials } from '../auth.helpers';
import { FirebaseError } from '@angular/fire/app';



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
        map((user) => AuthActions.loadUserSuccess({ user })),
        catchError(((error: FirebaseError) => {

          console.log(error)

          return EMPTY
        })
        ))
    )
  ))

  emailLink$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.sendEmailLink),
    switchMap(({ email }) => this.authService.sendSignInLinkToEmail$(email)
      .pipe(
        map(() => ({ type: 'NO_ACTION' })),
        catchError(() => {


          return EMPTY
        })
      )
    )
  ))

}

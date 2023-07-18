import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { EMPTY, catchError, concatMap, map } from 'rxjs';
import { mapUserCredentials } from '../auth.helpers';
import { FirebaseError } from '@angular/fire/app';



@Injectable()
export class AuthEffects {


  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }


  // loadUserWithGmail$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.signInWithGmail),
  //     concatMap((action) => this.authService.signInWithGoogle$()
  //       .pipe(
  //         map((user) => AuthActions.loadUserSuccess({ user })),
  //         catchError(() => EMPTY)
  //       ))
  //   )
  // )

  signIn$ = createEffect(() =>
    this.actions$.pipe(
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

  // loagUserWithWmilAnf$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(FavoriteActions.updateFavorite),
  //     switchMap(() => this.store.select(FavoritesSelectors.selectFavorite)
  //       .pipe(
  //         switchMap((favorite) => this.favoriteService.updateFavorite$(favorite?.userId as string, favorite?.vacationIds as string[])))
  //       .pipe(
  //         map(() => ({ type: 'NO_ACTION' })),
  //         catchError(() => EMPTY)
  //       ))
  //   ))
}

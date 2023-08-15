import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { mapUserCredentials } from '../auth.helpers';
import { saveToStorage } from 'src/app/utilities/helpers';
import { StorageKey } from 'src/app/utilities/constants';
import { concatMap, tap, map, catchError, EMPTY, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { EmailLinkDialogComponent } from '../email-link-dialog/email-link-dialog.component';



@Injectable()
export class AuthEffects {


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) { }



  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signIn),
    concatMap(({ signInEvent }) => this.authService.signIn$(signInEvent)
      .pipe(
        mapUserCredentials(),

        map((user) => AuthActions.loadUserSuccess({ user })),
        catchError((() => {
          return EMPTY
        })
        ))
    )
  ))

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserSuccess),
      tap(() => saveToStorage(StorageKey.LOGGED, true, { useSessionStorage: true })),
      tap(({ user }) => this.authService.saveUser(user)),
      tap(({ user }) => this.router.navigate(['/places/', user.userId]))
    ),
    { dispatch: false }
  );

  emailLink$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.sendEmailLink),
    switchMap(({ email }) => this.authService.sendSignInLinkToEmail$(email)
      .pipe(
        tap((email: string) => saveToStorage(StorageKey.LOGGED, email)),
        map((email) => AuthActions.sendEmailLinkSuccess({ email })),
        catchError(() => {
          return EMPTY
        })
      )
    )
  ))

  emailLnkDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendEmailLinkSuccess),
      tap(({ email }) => this.dialogService.openDialog(EmailLinkDialogComponent, { email }))
    ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadUser),
    switchMap(({ userId }) => this.authService.getUserById(userId)
      .pipe(
        map((user) => AuthActions.loadUserSuccess({ user })),
        catchError(() => {
          return EMPTY
        })
      )
    )
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => sessionStorage.clear()),
    tap(() => this.router.navigateByUrl('/'))
    ),
    { dispatch: false }
  )

}

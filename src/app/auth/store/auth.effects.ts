import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  EMPTY,
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from "rxjs";
import { DialogService } from "src/app/components/dialog/dialog.service";
import { StorageKey } from "src/app/utilities/constants";
import { saveToStorage } from "src/app/utilities/helpers";
import { mapFirebaseCredentials } from "../auth.helpers";
import { AuthDialogEvent, AuthEvent, authDialogMap } from "../auth.model";
import { AuthService } from "../auth.service";
import { ConfirmDialogComponent } from "../dialogs/confirm-dialog/confirm-dialog.component";
import { FirebaseError } from "../fireauth.service";
import { ResetService } from "../reset/reset.service";
import { AuthActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ signInEvent }) =>
        this.authService.signIn$(signInEvent).pipe(
          mapFirebaseCredentials(),
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((err: FirebaseError) => {
            return of(
              AuthActions.loadUserFailure({
                code: err.code,
                event: AuthEvent.LOGIN,
              })
            );
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      concatMap(({ email, password }) =>
        this.authService.register$(email, password).pipe(
          mapFirebaseCredentials(),
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((err: FirebaseError) => {
            return of(
              AuthActions.loadUserFailure({
                code: err.code,
                event: AuthEvent.REGISTER,
              })
            );
          })
        )
      )
    )
  );

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserSuccess),
        mergeMap(({ user }) =>
          this.authService
            .addDocument(user)
            .pipe(
              tap((user) => this.router.navigate(["/places/", user.userId]))
            )
        )
      ),
    { dispatch: false }
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(({ userId }) =>
        this.authService.getUserById(userId).pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  emailLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendEmailLink),
      switchMap(({ email }) =>
        this.authService.sendSignInLinkToEmail$(email).pipe(
          tap((email: string) => saveToStorage(StorageKey.EMAIL, email)),
          map((email) => AuthActions.sendEmailLinkSuccess({ email })),
          catchError(() => {
            return EMPTY;
          })
        )
      )
    )
  );

  sendResetEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendResetEmail),
      switchMap(({ email }) =>
        // this.resetService.sendResetEmail(email).pipe(
        of("email").pipe(
          map(() =>
            AuthActions.sendResetEmailSuccess({
              email,
              event: AuthDialogEvent.CONFIRM_EMAIL,
            })
          ),
          catchError((err: FirebaseError) => {
            return of(
              AuthActions.sendResetEmailFailure({
                code: err.code,
                event: AuthEvent.RESET,
              })
            );
          })
        )
      )
    )
  );

  confirmResetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.confirmResetPassword),
      switchMap(({ oobCode, newPassword }) =>
        // this.resetService.confirmPasswordReset(oobCode, newPassword).pipe(
        of("eil").pipe(
          map(() =>
            AuthActions.confirmResetPasswordSuccess({
              email: "test",
              event: AuthDialogEvent.RESET_PASSWORD,
            })
          ),
          catchError((err: FirebaseError) => {
            return of(
              AuthActions.sendResetEmailFailure({
                code: err.code,
                event: AuthEvent.RESET,
              })
            );
          })
        )
      )
    )
  );

  authDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.confirmResetPasswordSuccess,
          AuthActions.sendResetEmailSuccess
        ),
        tap(({ email, event }) =>
          this.dialogService.openDialog(authDialogMap[event], {
            email,
            event,
          })
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => sessionStorage.clear()),
        tap(() => this.router.navigateByUrl("/"))
      ),
    { dispatch: false }
  );
}

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
import { StorageKey } from "src/app/shared/constants";
import { DialogService } from "src/app/shared/dialog/dialog.service";
import { clearStorage, setToStorage } from "src/app/shared/helpers";
import { AuthDialogEvent, authDialogMap } from "../auth-dialogs";
import { mapFirebaseCredentials } from "../utils/auth.helpers";
import { AuthEvent } from "../utils/auth.model";
import { AuthService } from "../utils/auth.service";
import { FirebaseError } from "../utils/fireauth.service";
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
          tap(() => console.log(signInEvent)),
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
        tap(() => setToStorage(StorageKey.LOGGED, true)),
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
          tap((email: string) => setToStorage(StorageKey.EMAIL, email)),
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
        tap(() => clearStorage()),
        tap(() => this.router.navigateByUrl("/"))
      ),
    { dispatch: false }
  );
}

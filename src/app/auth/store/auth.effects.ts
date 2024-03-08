import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, concatMap, map, of, switchMap, tap } from "rxjs";
import { DialogService } from "src/app/components/dialog/dialog.service";
import { StorageKey } from "src/app/utilities/constants";
import { saveToStorage } from "src/app/utilities/helpers";
import { mapUserCredentials } from "../auth.helpers";
import { AuthService } from "../auth.service";
import { EmailLinkDialogComponent } from "../email-link/email-link-dialog/email-link-dialog.component";
import { AuthActions } from "./auth.actions";
import { FirebaseError } from "../fireauth.service";
import { ResetService } from "../reset/reset.service";
import { AuthEvent } from "../auth.model";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private resetService: ResetService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createUser),
      concatMap(({ email, password }) =>
        this.authService.register$(email, password).pipe(
          mapUserCredentials(),
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

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({ signInEvent }) =>
        this.authService.signIn$(signInEvent).pipe(
          mapUserCredentials(),
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

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserSuccess),
        switchMap(({ user }) =>
          this.authService
            .addDocument(user)
            .pipe(
              tap((user) => this.router.navigate(["/places/", user.userId]))
            )
        )
      ),
    { dispatch: false }
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
        this.resetService.sendResetEmail(email).pipe(
          map(() => AuthActions.sendEmailLinkSuccess({ email })),
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
        this.resetService.confirmPasswordReset(oobCode, newPassword).pipe(
          map(() => AuthActions.sendResetEmailSuccess({ email: "" })),
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

  emailLnkDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.sendEmailLinkSuccess),
        tap(({ email }) =>
          this.dialogService.openDialog(EmailLinkDialogComponent, { email })
        )
      ),
    { dispatch: false }
  );

  authDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.sendResetEmailSuccess),
        tap(({ email }) =>
          this.dialogService.openDialog(EmailLinkDialogComponent, { email })
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

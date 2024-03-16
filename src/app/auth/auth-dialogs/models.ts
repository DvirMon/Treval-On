import { ComponentType } from "@angular/cdk/portal";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ResetPasswordDialogComponent } from "./reset-password-dialog/reset-password-dialog.component";

type AuthDialogMap = Record<AuthDialogEvent, ComponentType<unknown>>;

export enum AuthDialogEvent {
    RESET_PASSWORD = "resetPassword",
    CONFIRM_EMAIL = "confirmEmail",
  }
  

export const authDialogMap: AuthDialogMap = {
    [AuthDialogEvent.CONFIRM_EMAIL]: ConfirmDialogComponent,
    [AuthDialogEvent.RESET_PASSWORD]: ResetPasswordDialogComponent,
  };
  
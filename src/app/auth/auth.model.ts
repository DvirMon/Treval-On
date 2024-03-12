import { ComponentType } from "@angular/cdk/portal";
import { FormServerError } from "../components/form-input/form.helper";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { ResetPasswordDialogComponent } from "./dialogs/reset-password/reset-password-dialog.component";

export interface User {
  userId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  photoURL: string;
}
export interface EmailAndPasswordSignIn {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

export enum SignInMethod {
  OPT = "oneTimePassword",
  EMAIL_LINK = "emailLink",
  EMAIL_PASSWORD = "password",
  FACEBOOK = "facebook.com",
  GITHUB = "github.com",
  GOOGLE = "google.com",
  PHONE = "phone",
  TWITTER = "twitter.com",
}

export interface SignInEvent {
  method: SignInMethod;
  data: unknown;
}

export enum AuthEvent {
  LOGIN = "login",
  REGISTER = "register",
  RESET = "reset",
  EMAIL_LINK = "emailLink",
}

export enum AuthDialogEvent {
  RESET_PASSWORD = "resetPassword",
  CONFIRM_EMAIL = "confirmEmail",
}

export interface AuthServerError extends FormServerError {
  event: AuthEvent;
}

type AuthDialogMap = Record<AuthDialogEvent, ComponentType<unknown>>;

export const authDialogMap: AuthDialogMap = {
  [AuthDialogEvent.CONFIRM_EMAIL]: ConfirmDialogComponent,
  [AuthDialogEvent.RESET_PASSWORD]: ResetPasswordDialogComponent,
};

import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Signal,
  WritableSignal,
  inject,
  runInInjectionContext,
  signal,
} from "@angular/core";

import { EmailLinkFormComponent } from "src/app/auth/email-link/email-link-form/email-link-form.component";
import { LoginFormComponent } from "src/app/auth/login/login-form/login-form.component";
import { FlipCardComponent } from "src/app/components/flip-card/flip-card.component";
import { FloatingButtonComponent } from "src/app/components/floating-button/floating-button.component";

import { MatButtonModule } from "@angular/material/button";
import { OtpLoginFormComponent } from "src/app/auth/otp/otp-login-form/otp-login-form.component";
import { RegisterCardComponent } from "src/app/auth/register/register-card/register-card.component";
import {
  ServerError,
  SignInEvent,
  SignInMethod,
} from "src/app/auth/store/auth.model";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { FlipCardService } from "src/app/components/flip-card/flip-card.service";

@Component({
  selector: "to-login-page",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FloatingButtonComponent,
    FlipCardComponent,
    LoginFormComponent,
    OtpLoginFormComponent,
    EmailLinkFormComponent,
    RegisterCardComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlipCardService],
})
export class LoginPageComponent {
  private readonly injector = inject(Injector);

  #authStore = inject(AuthStore);

  public readonly optFlag: WritableSignal<boolean>;
  public readonly serverError: Signal<ServerError | null>;

  constructor() {
    this.optFlag = signal(false);
    this.#authStore.loadUser();
    this.serverError = this.#authStore.loginServerError();
  }

  public onSignIn(event: SignInEvent) {
    this.#authStore.signIn(event);
  }

  public onOtpSignIn(event: SignInEvent) {
    const { method } = event;
    this._updateShowOtp(method);
    this._flipCard();
  }

  public onEmailLinkSignIn(event: SignInEvent) {
    const { method } = event;
    this._updateShowOtp(method);
    this._flipCard();
  }

  public onEmailAndPassword() {
    this._flipCard();
  }

  public onEmailLink(event: SignInEvent) {
    const { data } = event;
    this.#authStore.sendEmailLink(data as string);
  }

  public onForgetPassword() {
    // this.#authStore.resetPassword(event);
  }

  private _flipCard() {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip();
    });
  }

  private _updateShowOtp(method: SignInMethod): void {
    const show: boolean = method === SignInMethod.OPT;
    this.optFlag.set(show);
  }
}

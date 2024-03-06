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

import { EmailLinkFormComponent } from "src/app/auth/email-link-form/email-link-form.component";
import { LoginFormComponent } from "src/app/auth/login-form/login-form.component";
import { LoginOtpFormComponent } from "src/app/auth/login-otp-form/login-otp-form.component";
import { FlipCardComponent } from "src/app/components/flip-card/flip-card.component";
import { FloatingButtonComponent } from "src/app/components/floating-button/floating-button.component";

import { getMessaging, getToken } from "firebase/messaging";
import { Observable, from, of } from "rxjs";
import { SignInEvent, SignInMethod } from "src/app/auth/store/auth.model";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { FlipCardService } from "src/app/components/flip-card/flip-card.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "to-login-page",
  standalone: true,
  imports: [
    CommonModule,
    FloatingButtonComponent,
    FlipCardComponent,
    LoginFormComponent,
    LoginOtpFormComponent,
    EmailLinkFormComponent,
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
  public readonly serverError: Signal<string>;

  constructor() {
    this.optFlag = signal(true);
    this.#authStore.loadUser();
    this.serverError = this.#authStore.loginServerError();
  }

  protected onSignIn(event: SignInEvent) {
    this.#authStore.signIn(event);
  }

  protected onOtpSignIn(event: SignInEvent) {
    const { method } = event;
    this._updateShowOtp(method);
    this._flipCard();
  }

  protected onEmailLinkSignIn(event: SignInEvent) {
    const { method } = event;
    this._updateShowOtp(method);
    this._flipCard();
  }

  protected onEmailAndPassword() {
    this._flipCard();
  }

  protected onEmailLink(event: SignInEvent) {
    const { data } = event;
    this.#authStore.sendEmailLink(data as string);
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

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

import { FlipCardComponent } from "src/app/shared/components/flip-container/flip-container.component";
import { FloatingButtonComponent } from "src/app/shared/components/floating-button/floating-button.component";

import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import {
  AuthServerError,
  EmailLinkFormComponent,
  LoginFormComponent,
  OtpLoginFormComponent,
  SignInEvent,
  SignInMethod,
} from "src/app/auth";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { CardButtonComponent } from "src/app/shared/components/card-button/card-button.component";
import { FlipContainerService } from "src/app/shared/components/flip-container/flip-container.service";

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
    CardButtonComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlipContainerService],
})
export class LoginPageComponent {
  #injector = inject(Injector);
  #authStore = inject(AuthStore);

  public readonly showOtp: WritableSignal<boolean>;
  public readonly serverError: Signal<AuthServerError | null>;

  constructor() {
    this.showOtp = signal(false);
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
    runInInjectionContext(this.#injector, () => {
      inject(Router).navigateByUrl("reset");
    });
  }

  private _flipCard() {
    runInInjectionContext(this.#injector, () => {
      inject(FlipContainerService).flip();
    });
  }

  private _updateShowOtp(method: SignInMethod): void {
    const show: boolean = method === SignInMethod.OPT;
    this.showOtp.set(show);
  }
}

import { ChangeDetectionStrategy, Component, Injector, Signal, WritableSignal, inject, runInInjectionContext, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationResult } from '@angular/fire/auth';

import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';


import { SignInEvent, User, SignInMethod } from '../../auth/store/auth.model';

import { LoginOtpFormComponent } from 'src/app/auth/login-otp-form/login-otp-form.component';
import { EmailLinkFormComponent } from 'src/app/auth/email-link-form/email-link-form.component';

import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';
import { DialogService } from 'src/app/components/dialog/dialog.service';

import { map, switchMap, tap } from 'rxjs';
import { saveToSessionStorage } from 'src/app/utilities/helpers';

@Component({
  selector: 'to-login-page',
  standalone: true,
  imports: [CommonModule,
    FloatingButtonComponent,
    FlipCardComponent,
    LoginFormComponent,
    LoginOtpFormComponent,
    EmailLinkFormComponent,
    DialogComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FlipCardService]


})
export class LoginPageComponent {

  private readonly injector = inject(Injector);

  private readonly authStore = inject(AuthStore);
  private readonly dialogService = inject(DialogService);

  protected readonly user: Signal<User>;
  protected readonly showOpt: WritableSignal<boolean>;



  constructor() {
    this.user = this.authStore.getUser();
    this.showOpt = signal(false);
  }

  ngOnInit(): void {
    this.authStore.listenToSendEmailSuccess()
      .pipe(
        tap((email: string) => saveToSessionStorage('email', email))
      )
      .subscribe((value : string) => this.dialogService.openDialog(DialogComponent, { email: value }));
  }


  protected onLogin(event: SignInEvent) {
    this.authStore.signIn(event)
  }

  protected onSGoogleSignIn(event: SignInEvent): void {
    this.authStore.signIn(event);
  }

  protected onEmailAndPasswordSignIn(event: SignInEvent): void {
    this.authStore.signIn(event);
  }

  protected onOtpSignIn(event: SignInEvent) {
    this._updateShowOtp(event.method)
    this._flipCard()
  }

  protected onEmailLinkSignIn(event: SignInEvent) {

    const { method, data } = event


    if (data) {
      this.authStore.sendEmailLink(data);

    } else {

      this._updateShowOtp(method)
      this._flipCard()
    }
  }

  private _flipCard() {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip()
    })
  }

  private _updateShowOtp(method: SignInMethod): void {
    const show: boolean = method === SignInMethod.OPT
    this.showOpt.set(show)
  }

}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, WritableSignal, inject, runInInjectionContext, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { LoginOtpFormComponent } from 'src/app/auth/login-otp-form/login-otp-form.component';
import { EmailLinkFormComponent } from 'src/app/auth/email-link-form/email-link-form.component';

import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { SignInEvent, SignInMethod } from 'src/app/auth/store/auth.model';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { saveToStorage } from 'src/app/utilities/helpers';

import { from, pipe, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmailLinkDialogComponent } from 'src/app/auth/email-link-dialog/email-link-dialog.component';
import { StorageKey } from 'src/app/utilities/constants';

import { Messaging, getMessaging, getToken } from '@angular/fire/messaging';


@Component({
  selector: 'to-login-page',
  standalone: true,
  imports: [CommonModule,
    FloatingButtonComponent,
    FlipCardComponent,
    LoginFormComponent,
    LoginOtpFormComponent,
    EmailLinkFormComponent,
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

  protected readonly showOpt: WritableSignal<boolean>;

  private messaging: Messaging = getMessaging();

  constructor(
  ) {


    this.showOpt = signal(true);

    this.authStore.listenToSendEmailSuccess()
      .pipe(
        takeUntilDestroyed(),
        tap((email: string) => saveToStorage(StorageKey.LOGGED, email))
      )
      .subscribe((value: string) => this.dialogService.openDialog(EmailLinkDialogComponent, { email: value }));

    this.authStore.listenTLoadUserSuccess()
      .pipe(
        takeUntilDestroyed(),
      )
      .subscribe((userId: string) => this._routerAfterLogin(userId));
  }

  async ngOnInit() {

    const data = await getToken(this.messaging, { vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu" })

    console.log(data)

  }

  private _routerAfterLogin(userId: string): void {
    runInInjectionContext(this.injector, () => {
      return inject(Router).navigateByUrl('/places/' + userId)
    })
  }

  protected onSignIn(event: SignInEvent) {
    this.authStore.signIn(event)
  }

  protected onOtpSignIn(event: SignInEvent) {
    const { method } = event
    this._updateShowOtp(method);
    this._flipCard();
  }

  protected onEmailLinkSignIn(event: SignInEvent) {
    const { method } = event
    this._updateShowOtp(method);
    this._flipCard();
  }

  protected onEmailAndPassword() {
    this._flipCard()
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

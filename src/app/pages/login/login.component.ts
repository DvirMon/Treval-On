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

import { AuthStoreService } from 'src/app/auth/store/auth.store.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';
import { DialogService } from 'src/app/components/dialog/dialog.service';

import { map, switchMap, tap } from 'rxjs';

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

  private readonly authStore = inject(AuthStoreService);
  private readonly authService = inject(AuthService);
  private readonly dialogService = inject(DialogService);

  protected readonly user: Signal<User>;
  protected readonly showOpt: WritableSignal<boolean>;



  constructor() {
    this.user = this.authStore.getUser();
    this.showOpt = signal(false);

  }

  ngOnInit(): void {
    this.authStore.listenToSendEmailSuccess().pipe(
      tap((value) => console.log("success", value)),
      map((email) => this.authStore.signIn({ method: SignInMethod.EMAIL_LINK, data: { email, emailLink: "http://localhost:4200/verify-email?token=verification_token&apiKey=AIzaSyAWE61Vm0CpfUtHq4G48aJVMbdY6REEtrA&oobCode=kGbJWkmEKBSeQ1kvVSWog4UDlk6yGh_sKemik0xna4AAAAGJaAxV7Q&mode=signIn&lang=en" } }))
    )
      .subscribe((value) => console.log('router', value));

  }




  protected onLogin(event: SignInEvent) {
    this.authStore.signIn(event)
  }

  protected onSGoogleSignIn(event: SignInEvent): void {
    // this.authStore.signIn({method : SignInMethod.EMAIL_LINK, data : 'dmenajem@gmail.com'});

    this.authService.signInWithPhone$("+972547974643")
      .pipe(switchMap((confirmation: ConfirmationResult) => confirmation.confirm(""))
      ).subscribe(
        (value) => console.log('success', value),
        (error) => console.log('error', error)
      )
  }

  protected onEmailAndPasswordSignIn(event: SignInEvent): void {
    // this.authStore.signIn(event);
    const { method, data } = event

    // this.authService.signInWithEmailAndPassword$(data.email, data.password)
    //   .subscribe(
    //     (value) => {
    //       console.log('success', value)
    //     },
    //     (err) => { console.log(err) })

  }

  protected onOtpSignIn(event: SignInEvent) {
    this._updateShowOtp(event.method)
    this._flipCard()
  }

  protected onEmailLinkSignIn(event: SignInEvent) {

    const { method, data } = event

    this.authStore.sendEmailLink(data);
    // if (data) {
    //   console.log(data)

    // } else {

    //   this._updateShowOtp(method)
    //   this._flipCard()
    // }
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

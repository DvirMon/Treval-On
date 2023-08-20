import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, WritableSignal, inject, runInInjectionContext, signal } from '@angular/core';

import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { LoginOtpFormComponent } from 'src/app/auth/login-otp-form/login-otp-form.component';
import { EmailLinkFormComponent } from 'src/app/auth/email-link-form/email-link-form.component';

import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { SignInEvent, SignInMethod } from 'src/app/auth/store/auth.model';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';
import { getMessaging, getToken } from "firebase/messaging";
import { environment } from 'src/environments/environment';
import { Observable, catchError, from, of, throwError } from 'rxjs';


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

  protected readonly optFlag: WritableSignal<boolean>;

  constructor() {
    this.optFlag = signal(true);
    this.authStore.loadUser();


    // this.cloudMessage().pipe(
    //   catchError((error) => {
    //     console.log(error);
    //     return throwError(() => new Error(error));  // Make sure to re-throw the error after logging
    //   })
    // ).subscribe(
    //   (data) => console.log(data)  // log the actual data received
    // );

  }


  private requestPermissions(): Observable<NotificationPermission> {
    if (!("Notification" in window)) {
      return of('Notification API not available in this browser.' as unknown as NotificationPermission);
    }

    switch (Notification.permission) {
      case 'denied':
        console.log('User has blocked notifications.');
        return from(Notification.requestPermission());

      case 'granted':
        console.log('User has granted notifications.');
        return of('granted');

      default:
        console.log('User has not yet made a decision about notifications.');
        return from(Notification.requestPermission());
    }
  }


  private cloudMessage(): Observable<string> {



    const messaging = getMessaging();
    // Add the public key generated from the console here.
    return from(getToken(messaging, { vapidKey: environment.VAPID_KEY }))
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

  protected onEmailLink(event: SignInEvent) {
    const { data } = event
    this.authStore.sendEmailLink(data as string)
  }


  private _flipCard() {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip()
    })
  }

  private _updateShowOtp(method: SignInMethod): void {
    const show: boolean = method === SignInMethod.OPT
    this.optFlag.set(show)
  }



}

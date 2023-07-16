import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from 'src/app/auth/login-form/login-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FlipCardComponent } from 'src/app/components/flip-card/flip-card.component';
import { LoginOtpFormComponent } from 'src/app/auth/login-otp-form/login-otp-form.component';
import { EMPTY, Observable, Subject, catchError, exhaustMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../auth/store/auth.model';

@Component({
  selector: 'to-login-page',
  standalone: true,
  imports: [CommonModule, FloatingButtonComponent, FlipCardComponent, LoginFormComponent, LoginOtpFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginPageComponent {


  private readonly loginSource = new Subject<void>;

  constructor() { }

  private _signInWithGoogle$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap(() => inject(AuthService).signInWithGoogle$()),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  protected oLogin(): void {
    this.loginSource.next();
  }

}

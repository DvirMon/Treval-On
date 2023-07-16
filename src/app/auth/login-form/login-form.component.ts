import { ChangeDetectionStrategy, Component, EventEmitter, Injector, Output, WritableSignal, inject, runInInjectionContext, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { EMPTY, Observable, Subject, catchError, exhaustMap } from 'rxjs';
import { User } from '../store/auth.model';
import { FlipCardService } from 'src/app/components/flip-card/flip-card.service';

export interface LoginForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'to-login-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginFormComponent {

  private readonly loginSource = new Subject<void>;
  protected readonly loginFormGroup: FormGroup<LoginForm>;
  private readonly injector = inject(Injector);

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private authService: AuthService,
  ) {

    this._setGoogleIcon();

    // this._signInWithGoogle$()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe(user => this.authService.setUser(user))

    this.loginFormGroup = this._getLoginFormGroup(inject(NonNullableFormBuilder))

  }

  private _setGoogleIcon(): void {
    inject(MatIconRegistry).addSvgIcon(
      "google",
      inject(DomSanitizer).bypassSecurityTrustResourceUrl("assets/icons/google-icon.svg")
    );
  }

  private _signInWithGoogle$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap(() => this.authService.signInWithGoogle$()),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  private _getLoginFormGroup(nfb: NonNullableFormBuilder): FormGroup<LoginForm> {
    return nfb.group({
      email: nfb.control('', [Validators.required, Validators.email]),
      password: nfb.control('', [Validators.required]),
    })
  }

  protected oGoogleSignIn(): void {
    // this.loginSource.next();
    this.login.emit()
  }

  protected onSubmit(event: SubmitEvent, value: Partial<{ email: string; password: string; }>): void {
    console.log(value);
  }


  protected onOTP(): void {
    runInInjectionContext(this.injector, () => {
      inject(FlipCardService).flip()
    })
  }
}



import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
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
import { User } from 'src/app/store/user/user.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface LoginForm {
  email: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'to-login-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgOptimizedImage, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'perspective(800px) rotateY(0deg)'
      })),
      state('back', style({
        transform: 'perspective(800px) rotateY(180deg)'
      })),
      transition('front <=> back', [
        animate('0.5s')
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LoginFormComponent {

  private readonly loginSource = new Subject<void>;
  protected readonly loginFormGroup: FormGroup<LoginForm>;
  protected isFlipped: WritableSignal<boolean> = signal(false);

  constructor(
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private nfb: NonNullableFormBuilder
  ) {

    this._setGoogleIcon();

    this._signInWithGoogle$()
      .pipe(takeUntilDestroyed())
      .subscribe(user => this.authService.setUser(user))

    this.loginFormGroup = this._getLoginFormGroup()

  }

  private _getLoginFormGroup(): FormGroup<LoginForm> {
    return this.nfb.group({
      email: this.nfb.control('', [Validators.required, Validators.email]),
      password: this.nfb.control('', [Validators.required]),
    })
  }

  protected onButtonClick(): void {
    this.loginSource.next();
  }


  private _signInWithGoogle$(): Observable<User> {
    return this.loginSource.asObservable().pipe(
      exhaustMap(() => this.authService.googleAuth$()),
      catchError((error: Error) => {
        console.log('error', error);
        return EMPTY
      })
    )
  }

  private _setGoogleIcon() {
    this.matIconRegistry.addSvgIcon(
      "google",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/google-icon.svg")
    );
  }

  protected onSubmit(event: SubmitEvent, value: Partial<{ email: string; password: string; }>) {
    console.log(value);
  }


  protected onFlipCard(value: boolean) {
    console.log(value);
    this.isFlipped.set(!value);
  }
}



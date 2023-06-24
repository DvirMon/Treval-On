import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { EMPTY, Observable, Subject, catchError, exhaustMap } from 'rxjs';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'to-login-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgOptimizedImage, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush

})
export class LoginFormComponent {

  private readonly loginSource = new Subject<void>;

  constructor(
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
  ) {

    this._setGoogleIcon();
    this._signInWithGoogle$()
      .pipe(takeUntilDestroyed())
      .subscribe(user => this.authService.setUser(user))

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

  protected onSubmit(value: any) {
  }
}



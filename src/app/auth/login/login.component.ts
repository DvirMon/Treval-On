import { Component, Signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { EMPTY, Observable, Subject, catchError, exhaustMap, switchMap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from 'src/app/store/user/user.model';

@Component({
  selector: 'to-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent {

  private readonly loginSource = new Subject<void>;

  // private readonly user: Signal<User> = toSignal(this._signInWithGoogle$(), { initialValue: {} as User })
   readonly user: Signal<User> = this.authService.getUser()

  constructor(
    private authService: AuthService,
    private domSanitizer : DomSanitizer,
    private matIconRegistry : MatIconRegistry,
  ) {

    this._setGoogleIcon();
    this._signInWithGoogle$().subscribe(user => this.authService.setUser(user))

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
}



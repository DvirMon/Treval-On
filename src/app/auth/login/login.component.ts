import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Observable, Subject, catchError, switchMap, throwError } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'to-login-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginFormComponent {

  readonly loginSource = new Subject<void>;

  readonly user$ = this.signInWithGoogle();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      "google",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/google-icon.svg")
    );
  }

  protected onButtonClick(): void {
    this.loginSource.next()
  }

  private signInWithGoogle(){
    return this.loginSource.asObservable().pipe(
      switchMap(() => this.authService.googleAuth().pipe(catchError((error) => {
        console.log('error', error)
        return error
      }))))
  }
}

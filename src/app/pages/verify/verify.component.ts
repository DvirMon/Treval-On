import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InfoCardComponent } from 'src/app/components/info-card/info-card.component';
import { SignInEvent, SignInMethod } from 'src/app/auth/store/auth.model';
import { AuthStore } from 'src/app/auth/store/auth.store.service';

@Component({
  selector: 'to-verify',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, InfoCardComponent],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyPageComponent {

  protected readonly emailLink: string = window.location.href;

  authStore: AuthStore = inject(AuthStore)

  onEmailLinkSignIn(emailLink: string) {
    const event: SignInEvent = { method: SignInMethod.EMAIL_LINK, data: {email : "dmenajem@gmail.com", emailLink} }
    console.log("working")
    this.authStore.signIn(event)
  }


}

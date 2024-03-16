import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { getFromStorage } from "src/app/shared/helpers";
import { SignInEvent, SignInMethod } from "src/app/auth";
import { InfoCardComponent } from "src/app/shared/components/info-card/info-card.component";
import { StorageKey } from "src/app/shared/constants";

@Component({
  selector: "to-verify",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, InfoCardComponent],
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyPageComponent {
  protected readonly emailLink: string = window.location.href;

  @Input() email!: string;

  authStore: AuthStore = inject(AuthStore);

  onEmailLinkSignIn(emailLink: string) {
    const email: string | null = getFromStorage(StorageKey.EMAIL);
    const event: SignInEvent = {
      method: SignInMethod.EMAIL_LINK,
      data: { email, emailLink },
    };
    this.authStore.signIn(event);
  }
}

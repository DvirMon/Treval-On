import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { InfoCardComponent } from "src/app/components/info-card/info-card.component";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { getFromStorage } from "src/app/utils/helpers";
import { StorageKey } from "src/app/utils/constants";
import { SignInEvent, SignInMethod } from "src/app/auth";

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

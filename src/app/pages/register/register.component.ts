import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from "@angular/core";
import {
  AuthServerError,
  EmailAndPasswordSignIn,
  RegisterFormComponent,
} from "src/app/auth";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { CardButtonComponent } from "src/app/shared/components/card-button/card-button.component";

@Component({
  selector: "to-register-page",
  standalone: true,
  imports: [RegisterFormComponent, CardButtonComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  #authStore = inject(AuthStore);

  public readonly serverError: Signal<AuthServerError | null>;

  constructor() {
    this.serverError = this.#authStore.loginServerError();
  }
  onRegister(value: EmailAndPasswordSignIn): void {
    const { email, password } = value;
    this.#authStore.register(email, password);
  }
}

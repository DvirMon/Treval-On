import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  inject,
} from "@angular/core";
import { RegisterFormComponent, AuthServerError, EmailAndPasswordSignIn } from "src/app/auth";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { AuthStore } from "src/app/auth/store/auth.store.service";

@Component({
  selector: "to-register",
  standalone: true,
  imports: [RegisterFormComponent, AuthActionComponent],
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

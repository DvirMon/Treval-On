import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { RegisterFormComponent } from "src/app/auth/register/register-form/register-form.component";
import { EmailAndPasswordSignIn } from "src/app/auth/store/auth.model";
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

  onRegister(value: EmailAndPasswordSignIn): void {
    const { email, password } = value;
    this.#authStore.register(email, password);
  }
}

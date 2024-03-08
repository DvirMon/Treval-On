import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthActionComponent } from "src/app/auth/auth-action/auth-action.component";
import { RegisterFormComponent } from "src/app/auth/register/register-form/register-form.component";
import { EmailAndPasswordSignIn } from "src/app/auth/store/auth.model";
import { AuthStore } from "src/app/auth/store/auth.store.service";
import { FloatingButtonComponent } from "src/app/components/floating-button/floating-button.component";

@Component({
  selector: "to-register",
  standalone: true,
  imports: [
    CommonModule,
    RegisterFormComponent,
    FloatingButtonComponent,
    AuthActionComponent,
  ],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private readonly authStore = inject(AuthStore);

  onRegister(value: EmailAndPasswordSignIn): void {
    const { email, password } = value;
    this.authStore.register(email, password);
  }
}

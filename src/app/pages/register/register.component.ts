import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from 'src/app/auth/register-form/register-form.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { AuthStore } from 'src/app/auth/store/auth.store.service';
import { EmailAndPasswordSignIn } from 'src/app/auth/store/auth.model';

@Component({
  selector: 'to-register',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent, FloatingButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegisterPageComponent {

  private readonly authStore = inject(AuthStore);

  onRegister(value: EmailAndPasswordSignIn): void {
    const { email, password } = value;
    this.authStore.register(email, password);
  }


}

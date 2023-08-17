import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'to-register-form',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegisterFormComponent {






  private _buildRegisterForm() {
    return inject(NonNullableFormBuilder).group({
      firstName: ['', [
        Validators.required,
        // Validators.pattern(this.validationService.regex.name),
        Validators.minLength(3),
        Validators.maxLength(30)]],
      lastName: ['', [
        Validators.required,
        // Validators.pattern(this.validationService.regex.name),
        Validators.minLength(3),
        Validators.maxLength(30)]],
      email: ['',
        // [Validators.required, Validators.pattern(this.validationService.regex.email)],
        // [this.validationService.emailUniqueAsyncValidation.bind(this)]
      ],
      password: ['', [
        Validators.required,
        // Validators.pattern(this.validationService.regex.password),
        Validators.minLength(8),
        Validators.maxLength(24)]],
      // confirmPassword: ['',
      //   [Validators.required, Validators.pattern(this.validationService.regex.password)]],
    },
      {
        // validator: [this.validationService.mustMatch('password', 'confirmPassword')],
      })
  }


}

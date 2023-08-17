import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailAndPasswordSignIn } from '../store/auth.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DividerHeaderComponent } from 'src/app/components/divider-header/divider-header.component';


interface RegisterForm {
  email: FormControl<string>
  password: FormControl<string>
}


@Component({
  selector: 'to-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    DividerHeaderComponent
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegisterFormComponent {

  protected readonly registerFormGroup: FormGroup<RegisterForm>;

  constructor() {
    this.registerFormGroup = this._buildRegisterForm()
  }

  private _buildRegisterForm(): FormGroup<RegisterForm> {
    return inject(NonNullableFormBuilder).group({
      email: ['',
        [Validators.required],
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

  protected onSubmit(value: Partial<EmailAndPasswordSignIn>): void {
    console.log(value)
  }


}

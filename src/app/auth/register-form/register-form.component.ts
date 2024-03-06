import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/components/form-input/form-input.component";
import { getFormKeys } from "src/app/components/form-input/form.helper";
import { EmailAndPasswordSignIn } from "../store/auth.model";

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "to-register-form",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormInputComponent,
    DividerHeaderComponent,
  ],
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  protected readonly registerFormGroup: FormGroup<RegisterForm>;

  public formKeys: string[] = [];

  public errorsMap: { [key: string]: ValidationErrors } = {
    password: {
      minlength: "password is to short",
      maxlength: "password is to long",
    },
  };

  @Output() register: EventEmitter<EmailAndPasswordSignIn> = new EventEmitter();

  constructor() {
    this.registerFormGroup = this._buildRegisterForm();
    this.formKeys = getFormKeys(this.registerFormGroup);
  }

  private _buildRegisterForm(): FormGroup<RegisterForm> {
    return inject(NonNullableFormBuilder).group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        // confirmPassword: ['',
        //   [Validators.required, Validators.pattern(this.validationService.regex.password)]],
      },
    );
  }

  public onSubmit(value: Partial<EmailAndPasswordSignIn>): void {
    this.register.emit(value as EmailAndPasswordSignIn);
  }
}

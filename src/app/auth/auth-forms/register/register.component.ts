import { TitleCasePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  effect,
  inject,
  input,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { DividerHeaderComponent } from "src/app/shared/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/shared/components/form-input/form-input.component";
import {
  FormServerError,
  getFormKeys,
  handleServerError,
} from "src/app/shared/components/form-input/form.helper";

import { AuthServerError, EmailAndPasswordSignIn } from "../../index";
import { DEFAULT_EMAIL } from "src/app/shared/constants";

interface RegisterForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "to-register-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    MatCard,
    MatCardContent,
    MatButton,
    FormInputComponent,
    DividerHeaderComponent,
  ],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  serverError = input<AuthServerError | null>({} as AuthServerError);

  public readonly registerFormGroup: FormGroup<RegisterForm>;
  public readonly formKeys: WritableSignal<string[]>;

  public readonly errorsMap: { [key: string]: ValidationErrors } = {
    password: {
      minlength: "password is to short",
      maxlength: "password is to long",
    },
  };

  @Output() register: EventEmitter<EmailAndPasswordSignIn> = new EventEmitter();

  constructor() {
    this.registerFormGroup = this._buildRegisterForm();
    this.formKeys = getFormKeys(this.registerFormGroup);

    effect(
      () => {
        const serverError = this.serverError();

        handleServerError(
          this.registerFormGroup,
          serverError as FormServerError
        );
      },
      { allowSignalWrites: true }
    );
  }

  private _buildRegisterForm(): FormGroup<RegisterForm> {
    return inject(NonNullableFormBuilder).group({
      email: [DEFAULT_EMAIL, [Validators.required, Validators.email]],
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
    });
  }

  public onSubmit(value: Partial<EmailAndPasswordSignIn>): void {
    this.register.emit(value as EmailAndPasswordSignIn);
  }
}

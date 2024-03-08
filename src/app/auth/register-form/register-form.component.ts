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
import { DividerHeaderComponent } from "src/app/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/components/form-input/form-input.component";
import {
  FormServerError,
  getFormKeys,
  handleServerError,
} from "src/app/components/form-input/form.helper";
import {
  AuthEvent,
  AuthServerError,
  EmailAndPasswordSignIn,
} from "../auth.model";

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
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  serverError = input<AuthServerError | null>({} as AuthServerError);

  public readonly registerFormGroup: FormGroup<RegisterForm>;
  public readonly formKeys: WritableSignal<string[]>;

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

    effect(
      () => {
        const serverError = this.serverError();

        if (serverError?.mode === AuthEvent.REGISTER) {
          handleServerError(
            this.registerFormGroup,
            serverError as FormServerError
          );
        }
      },
      { allowSignalWrites: true }
    );
  }

  private _buildRegisterForm(): FormGroup<RegisterForm> {
    return inject(NonNullableFormBuilder).group({
      email: ["dmenajem@gmail.com", [Validators.required, Validators.email]],
      password: [
        "12345678",
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

import { CommonModule, NgOptimizedImage, TitleCasePipe } from "@angular/common";
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
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { DividerHeaderComponent } from "src/app/shared/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/shared/components/form-input/form-input.component";

import {
  FormServerError,
  getFormKeys,
  handleServerError,
} from "src/app/shared/components/form-input/form.helper";
import {
  AuthServerError,
  EmailAndPasswordSignIn,
  SignInEvent,
  SignInMethod,
} from "../../index";
import { DEFAULT_EMAIL } from "src/app/shared/constants";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: "to-login-form",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TitleCasePipe,
    DividerHeaderComponent,
    FormInputComponent,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public readonly loginFormGroup: FormGroup<LoginForm>;

  public readonly serverError = input<AuthServerError | null>(
    {} as AuthServerError
  );

  public readonly errorsMap: { [key: string]: ValidationErrors } = {
    password: {
      minlength: "password is to short",
      maxlength: "password is to long",
    },
  };

  public readonly formKeys: WritableSignal<string[]>;

  @Output() login: EventEmitter<SignInEvent> = new EventEmitter();
  @Output() google: EventEmitter<SignInEvent> = new EventEmitter();
  @Output() otp: EventEmitter<SignInEvent> = new EventEmitter();
  @Output() emailLink: EventEmitter<SignInEvent> = new EventEmitter();
  @Output() forget: EventEmitter<void> = new EventEmitter();

  constructor() {
    this._setGoogleIcon();

    this.loginFormGroup = this.buildLoginForm();

    this.formKeys = getFormKeys(this.loginFormGroup);

    effect(
      () => {
        const serverError = this.serverError();

        handleServerError(this.loginFormGroup, serverError as FormServerError);
      },
      { allowSignalWrites: true }
    );
  }

  private _setGoogleIcon(): void {
    inject(MatIconRegistry).addSvgIcon(
      "google",
      inject(DomSanitizer).bypassSecurityTrustResourceUrl(
        "assets/icons/google-icon.svg"
      )
    );
  }

  private buildLoginForm(): FormGroup<LoginForm> {
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
    });
  }

  public oGoogleSignIn(): void {
    const event = this._createSignInEvent(SignInMethod.GOOGLE);
    this.google.emit(event);
  }

  public onSubmit(value: Partial<EmailAndPasswordSignIn>): void {
    const event = this._createSignInEvent(SignInMethod.EMAIL_PASSWORD, value);
    this.login.emit(event);
  }

  public onOtpSignIn(): void {
    const event = this._createSignInEvent(SignInMethod.OPT);
    this.otp.emit(event);
  }

  public onEmailLinkSignIn() {
    const event = this._createSignInEvent(SignInMethod.EMAIL_LINK);
    this.emailLink.emit(event);
  }

  public onForgetPassword() {
    this.forget.emit();
  }

  private _createSignInEvent(
    method: SignInMethod,
    data?: unknown
  ): SignInEvent {
    return {
      method,
      data,
    } as SignInEvent;
  }

  //   private _handleServerError(
  //     group: FormGroup,
  //     server: AuthServerError | null
  //   ): void {
  //     if (group !== null && server !== null) {
  //       const control = group.get(server.control as string);

  //       if (control != null) {
  //         control.setErrors({ serverError: server.message });
  //       }
  //     }
  //   }
  // }
}

import { JsonPipe, TitleCasePipe } from "@angular/common";
import {
  Component,
  EventEmitter,
  Output,
  WritableSignal,
  inject,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { DividerHeaderComponent } from "src/app/shared/components/divider-header/divider-header.component";
import { FormInputComponent } from "src/app/shared/components/form-input/form-input.component";
import { getFormKeys } from "src/app/shared/components/form-input/form.helper";

interface ResetPasswordForm {
  newPassword: FormControl<string>;
}

@Component({
  selector: "to-reset-password-form",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    JsonPipe,
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    FormInputComponent,
    DividerHeaderComponent,
  ],
  templateUrl: "./reset-password-form.component.html",
  styleUrl: "./reset-password-form.component.scss",
})
export class ResetPasswordFormComponent {
  public readonly resetPasswordFormGroup: FormGroup<ResetPasswordForm>;
  public readonly formKeys: WritableSignal<string[]>;

  @Output() resetPassword: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.resetPasswordFormGroup = this._buildResetForm();
    this.formKeys = getFormKeys(this.resetPasswordFormGroup);
  }

  private _buildResetForm(): FormGroup<ResetPasswordForm> {
    return inject(NonNullableFormBuilder).group({
      newPassword: [
        "abcdefgh",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }

  public onSubmit(value: Partial<{ newPassword: string }>): void {
    this.resetPassword.emit(value.newPassword);
  }
}
